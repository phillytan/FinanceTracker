import { useState, useRef } from 'react'
import Papa from 'papaparse'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addTransactionsAsync } from '../../redux/thunks/transactionThunk'
import TransactionMappingModal from './TransactionMappingModal'

export default function BulkUpload() {
  const [open, setOpen] = useState(false)
  const [mappingModal, setMappingModal] = useState(false)
  const [uploadData, setUploadData] = useState([])
  const fileInputRef = useRef(null)

  const dispatch = useDispatch()

  const mapData = (data) => {
    const mappedData = uploadData.map((transaction) => {
      return {
        ...(data.merchantName
          ? { merchantName: transaction[data.merchantName] }
          : {}),
        amount: transaction[data.amount],
        ...(data.address ? { address: transaction[data.address] } : {}),
        date: transaction[data.date],
        transactionType: transaction[data.transactionType],
        currency: transaction[data.currency],
        paymentMethod: transaction[data.paymentMethod],
        ...(data.description
          ? { description: transaction[data.description] }
          : {}),
      }
    })
    let cleanData = filterFutureDates(mappedData)
    if (cleanData.length < mappedData.length) {
      setOpen(true)
    }
    dispatch(addTransactionsAsync(cleanData))
  }

  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setUploadData(results.data)
          setMappingModal(true)
        },
        error: (error) => {
          console.log(error)
        },
      })
    }
  }

  const closeMessage = () => {
    setOpen(false)
  }

  function filterFutureDates(data) {
    let cleanData = []
    let today = new Date()
    for (let entry of data) {
      if (new Date(entry.date) <= today) {
        cleanData.push(entry)
      }
    }
    return cleanData
  }

  const onCloseTransactionMappingModal = () => {
    setMappingModal(false)
    fileInputRef.current.value = ''
  }

  return (
    <div style={{ marginLeft: '5px' }}>
      <Dialog open={open} onClose={closeMessage} maxWidth='md'>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Some transactions were not included due to having a transaction date
            in the future. Only transactions with dates in the past are allowed,
            so not all transactions were added.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeMessage}>Continue</Button>
        </DialogActions>
      </Dialog>
      {mappingModal && (
        <TransactionMappingModal
          open={mappingModal}
          onClose={onCloseTransactionMappingModal}
          fields={uploadData[0] ? Object.keys(uploadData[0]) : []}
          mapData={mapData}
        />
      )}
      <Button variant='outlined' component='label'>
        Bulk upload
        <input
          ref={fileInputRef}
          type='file'
          hidden
          accept='.csv'
          onChange={handleUpload}
        />
      </Button>
    </div>
  )
}

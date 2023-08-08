import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  IconButton,
  Box,
  DialogContentText,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { FormProvider, useForm } from 'react-hook-form'
import FieldSelect from './FieldSelect'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const TRANSACTION_FIELDS = [
  'merchantName',
  'amount',
  'address',
  'date',
  'transactionType',
  'currency',
  'paymentMethod',
  'description',
]

const transactionMappingSchema = z.object({
  merchantName: z.string(),
  amount: z.string().min(1, { message: 'Mapping required for amount' }),
  address: z.string(),
  date: z.string().min(1, 'Mapping required for date'),
  transactionType: z.string().min(1, 'Mapping required for transaction type'),
  currency: z.string().min(1, 'Mapping required for currency'),
  paymentMethod: z.string().min(1, 'Mapping required for payment method'),
  description: z.string(),
})

export default function TransactionMappingModal({
  open,
  onClose,
  fields,
  mapData,
}) {
  const formState = useForm({
    resolver: zodResolver(transactionMappingSchema),
    defaultValues: {
      merchantName: fields.includes('merchantName') ? 'merchantName' : '',
      amount: fields.includes('amount') ? 'amount' : '',
      address: fields.includes('address') ? 'address' : '',
      date: fields.includes('date') ? 'date' : '',
      transactionType: fields.includes('transactionType')
        ? 'transactionType'
        : '',
      currency: fields.includes('currency') ? 'currency' : '',
      paymentMethod: fields.includes('paymentMethod') ? 'paymentMethod' : '',
      description: fields.includes('description') ? 'description' : '',
    },
    mode: 'onTouched',
  })
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = formState

  const onValid = (data) => {
    mapData(data)
  }

  const onInvalid = (error) => {
    global.setNotification('error', error)
  }

  const onSubmit = handleSubmit(onValid, onInvalid)

  const onContinue = () => {
    onSubmit()
    onClose()
    global.setNotification('success', 'Your transactions have been added.')
  }
  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle>Map your fields</DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
        <DialogContentText>
          Choose the columns from your CSV file to be mapped to each field.
        </DialogContentText>
        <FormProvider {...formState}>
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={onContinue}
          >
            {TRANSACTION_FIELDS.map((field) => (
              <FieldSelect
                key={field}
                name={field}
                label={field}
                control={control}
                variant='outlined'
                margin='normal'
                fields={fields}
              />
            ))}
            <DialogActions>
              <Button type='submit' disabled={!isValid}>
                Continue
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

import * as React from "react";
import Papa from "papaparse";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTransactionsAsync } from '../../redux/thunks/transactionThunk';

export default function BulkUpload() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          let cleanData = filterFutureDates(results.data);
          if (cleanData.length < results.data.length) {
            setOpen(true);
          }
          dispatch(addTransactionsAsync(cleanData));
        },
        error: (error) => {
            console.log(error)
        }
      });
    }
  };

  const closeMessage = () => {
    setOpen(false);
  }

  function filterFutureDates(data) {
    let cleanData = [];
    let today = new Date();
    for (let entry of data) {
      if (new Date(entry.date) <= today) {
        cleanData.push(entry);
      }
    }
    return cleanData;
  }

  return (
    <div style={{ marginLeft: "5px" }}>
      <Dialog open={open} onClose={closeMessage} maxWidth="md">
                <DialogTitle>Warning</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Some transactions were not included due to having a transaction date in the future.
                        Only transactions with dates in the past are allowed, so not all transactions were added.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeMessage}>Continue</Button>
                </DialogActions>
            </Dialog>
      <Button variant="outlined" component="label">
        Bulk upload
        <input type="file" hidden accept=".csv" onChange={handleUpload} />
      </Button>
    </div>
  );
}

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Button } from "@mui/material";

export default function BulkUpload() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setTransactions(results.data);
        },
        error: (error) => {
            console.log(error)
        }
      });
    }
  };

  return (
    <div style={{ marginLeft: "5px" }}>
      <Button variant="outlined" component="label">
        Bulk upload
        <input type="file" hidden accept=".csv" onChange={handleUpload} />
      </Button>
    </div>
  );
}

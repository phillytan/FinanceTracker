import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, useForm } from "react-hook-form";
import ReactHookFormSelect from "./ReactHookFormSelect";
import { useEffect } from "react";

const TRANSACTION_FIELDS = [
  "merchantName",
  "amount",
  "address",
  "date",
  "transactionType",
  "currency",
  "paymentMethod",
  "description",
];

export default function TransactionMappingModal({
  open,
  onClose,
  fields,
  mapData,
}) {
  console.log(fields, fields.includes("merchantName"));
  const formState = useForm({
    defaultValues: {
      merchantName: fields.includes("merchantName") ? "merchantName" : "",
      amount: fields.includes("amount") ? "amount" : "",
      address: fields.includes("address") ? "address" : "",
      date: fields.includes("date") ? "date" : "",
      transactionType: fields.includes("transactionType")
        ? "transactionType"
        : "",
      currency: fields.includes("currency") ? "currency" : "",
      paymentMethod: fields.includes("paymentMethod") ? "paymentMethod" : "",
      description: fields.includes("description") ? "description" : "",
    },
  });
  const { control, handleSubmit, watch } = formState;

  const onValid = (data) => {
    mapData(data);
  };

  const onInvalid = () => {
    console.log("invalid");
  };

  const onSubmit = handleSubmit(onValid, onInvalid);

  const onContinue = () => {
    onSubmit();
    onClose();
  };
  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center'
          }}
        >
          <DialogTitle variant="h4">Choose your fields</DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <FormProvider {...formState}>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onContinue}
          >
            {TRANSACTION_FIELDS.map((field) => (
              <ReactHookFormSelect
                key={field}
                name={field}
                label={field}
                control={control}
                variant="outlined"
                margin="normal"
                fields={fields}
              />
            ))}
            <DialogActions>
              <Button type="submit">Continue</Button>
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

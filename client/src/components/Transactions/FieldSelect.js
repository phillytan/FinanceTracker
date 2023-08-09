// Reference: https://stackoverflow.com/questions/63236951/how-to-use-material-ui-select-with-react-hook-form
import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import { Controller } from 'react-hook-form'

const FieldSelect = ({ name, label, control, fields, ...props }) => {
  const labelId = `${name}-label`
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        id={label}
        control={control}
        name={label}
        render={({ field, fieldState }) => (
          <>
            <Select
              label={label}
              id={labelId}
              select
              {...field}
              {...fieldState}
            >
              <MenuItem key={`${label}-none`} value=''>
                None
              </MenuItem>
              {fields.map((field) => (
                <MenuItem key={`${label}-${field}`} value={field}>
                  {field}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  )
}
export default FieldSelect

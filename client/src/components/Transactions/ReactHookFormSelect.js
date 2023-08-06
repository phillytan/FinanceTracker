// Reference: https://stackoverflow.com/questions/63236951/how-to-use-material-ui-select-with-react-hook-form
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  fields,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        control={control}
        name={label}
        render={({ field }) => (
          <Select id={labelId} {...field}>
            {fields.map((field) => (
              <MenuItem key={`${label}-${field}`} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

interface AdvancedFormSelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  isLoading: boolean;
  error: string | null;
  handleChange: (event: SelectChangeEvent<string>) => void;
}

const AdvancedFormSelectField: React.FC<AdvancedFormSelectFieldProps> = ({
  label,
  name,
  value,
  options,
  isLoading,
  error,
  handleChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={handleChange} label={label}>
        <MenuItem value="">Any</MenuItem>
        {isLoading ? (
          <MenuItem disabled>
            <CircularProgress size={20} />
          </MenuItem>
        ) : error ? (
          <MenuItem disabled>
            <Typography color="error">
              Error loading {label.toLowerCase()}
            </Typography>
          </MenuItem>
        ) : options.length > 0 ? (
          options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        ) : null}
      </Select>
    </FormControl>
  );
};

export default AdvancedFormSelectField;

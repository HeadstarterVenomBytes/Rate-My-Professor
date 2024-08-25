import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AdvancedFormSelectField from "./AdvancedFormSelectField";

export interface AdvancedSearchFormData {
  university: string;
  department: string;
  numRecommendations: number;
}

interface AdvancedSearchFormProps {
  onSubmit: (formData: AdvancedSearchFormData) => void;
  metadata: {
    universities: string[];
    departments: string[];
  } | null;
  isLoadingMetadata: boolean;
  metadataError: string | null;
}

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  onSubmit,
  metadata,
  isLoadingMetadata,
  metadataError,
}) => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [formData, setFormData] = useState<AdvancedSearchFormData>({
    university: "",
    department: "",
    numRecommendations: 5,
  });

  // Overloaded handleChange that can handle both Select and TextField events
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
  function handleChange(event: SelectChangeEvent<string>): void;
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ): void {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Button
        onClick={() => setShowAdvanced(!showAdvanced)}
        startIcon={showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{ mb: 2 }}
      >
        Advanced Search
      </Button>

      <TextField
        name="numRecommendations"
        type="number"
        label="Number of Recommendations"
        value={formData.numRecommendations}
        onChange={handleChange}
        inputProps={{ min: 1, max: 20 }}
        sx={{ mb: 2, width: "200px" }}
      />

      <Collapse in={showAdvanced}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <AdvancedFormSelectField
              label="University"
              name="university"
              value={formData.university}
              options={metadata?.universities || []}
              isLoading={isLoadingMetadata}
              error={metadataError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AdvancedFormSelectField
              label="Department"
              name="department"
              value={formData.department}
              options={metadata?.departments || []}
              isLoading={isLoadingMetadata}
              error={metadataError}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </Collapse>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Apply Filters
      </Button>
    </Box>
  );
};

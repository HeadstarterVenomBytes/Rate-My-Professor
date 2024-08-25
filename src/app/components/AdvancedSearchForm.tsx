import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Grid,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AdvancedFormSelectField from "./AdvancedFormSelectField";
import { MetadataResult } from "@/types/pineconeMetadata";
import { AdvancedSearchFormData } from "@/types/professorSearchQuery";

interface AdvancedSearchFormProps {
  formData: AdvancedSearchFormData;
  setFormData: React.Dispatch<React.SetStateAction<AdvancedSearchFormData>>;
  metadata: MetadataResult | null;
  isLoadingMetadata: boolean;
  metadataError: string | null;
  onSubmit: () => void;
}

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  formData,
  setFormData,
  metadata,
  isLoadingMetadata,
  metadataError,
  onSubmit,
}) => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

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
    onSubmit();
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
              options={metadata?.university || []}
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
              options={metadata?.department || []}
              isLoading={isLoadingMetadata}
              error={metadataError}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </Collapse>

      {showAdvanced && (
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Apply Filters
        </Button>
      )}
    </Box>
  );
};

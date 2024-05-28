import { Box, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { Universities } from "../../assets/Universities";

// Define the type for a university object
type University = {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
};

const SelectUniversity = () => {
  // State to manage the selected institution
  const [selectedInstitution, setSelectedInstitution] =
    useState<University | null>(null);

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={Universities}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Institution"
            variant="outlined"
          />
        )}
        onChange={(_event, newValue) => {
          setSelectedInstitution(newValue);
        }}
      />
      {selectedInstitution && (
        <Box mt={2}>
          <strong>Selected Institution:</strong> {selectedInstitution.name}
        </Box>
      )}
    </Box>
  );
};

export default SelectUniversity;

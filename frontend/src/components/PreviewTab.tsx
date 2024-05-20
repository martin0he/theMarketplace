import React from "react";
import { Box, Typography } from "@mui/material";
import { useListing } from "./ListingContext";

const PreviewTab = () => {
  const { listing } = useListing();

  if (!listing) {
    return <Typography>No listing to preview</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5">{listing.name}</Typography>
      <Typography variant="body1">{listing.description}</Typography>
      <Typography variant="body2">Price: ${listing.price}</Typography>
      <Typography variant="body2">Condition: {listing.condition}</Typography>
      <Typography variant="body2">
        Payment Methods: {listing.paymentMethod.join(", ")}
      </Typography>
      <Typography variant="body2">
        Location: {listing.exchangeLocation}
      </Typography>
      {/* Add more fields as necessary */}
    </Box>
  );
};

export default PreviewTab;

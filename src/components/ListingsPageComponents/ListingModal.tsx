// src/components/ListingModal.tsx
import React from "react";
import { Box, Typography, Modal, useTheme } from "@mui/material";
import { Listing } from "../../types";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface ListingModalProps {
  open: boolean;
  handleClose: () => void;
  listing: Listing | null;
}

const ListingModal: React.FC<ListingModalProps> = ({
  open,
  handleClose,
  listing,
}) => {
  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  if (!listing) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 0.7 * width,
          height: 0.6 * height,
          bgcolor: theme.palette.customColors.bodyBG,
          border: "1.5px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "12px",
        }}
      >
        <Typography variant="h6" component="h2">
          {listing.name}
        </Typography>
        <Typography sx={{ mt: 2 }}>{listing.description}</Typography>
        <Typography sx={{ mt: 2 }}>Price: {listing.price}</Typography>
      </Box>
    </Modal>
  );
};

export default ListingModal;

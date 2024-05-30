// src/components/ListingModal.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, useTheme, Grid } from "@mui/material";
import { CustomUser, Listing } from "../../types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CustomCarousel from "../general/CustomCarousel";
import supabase from "../../auth/supabase";

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
  const [currentSeller, setCurrentSeller] = useState<CustomUser>();

  useEffect(() => {
    const handleFetchSeller = async () => {
      const { data: Seller, error } = await supabase
        .from("Users")
        .select("*")
        .eq("id", listing?.seller_id)
        .single();

      if (error) {
        console.log("Error fetching seller:", error);
      }

      setCurrentSeller(Seller as CustomUser);
    };
    handleFetchSeller();
  }, [listing]);

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
        <Grid container>
          <Grid item xs={6}>
            <Typography>{listing.name}</Typography>
            <CustomCarousel
              imageUrls={listing.imageUrls}
              width={`${0.25 * width}px`}
              height={`${0.32 * height}px`}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>By: {currentSeller?.username}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ListingModal;

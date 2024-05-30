// src/components/ListingModal.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, useTheme, Grid, Tooltip } from "@mui/material";
import { CustomUser, Listing } from "../../types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CustomCarousel from "../general/CustomCarousel";
import supabase from "../../auth/supabase";
import { calculateDaysAgo, datePipe } from "../../pipes/sellDatePipe";

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
          overflow: "auto",
        }}
      >
        <Grid container sx={{ borderRadius: "12px" }}>
          <Grid item xs={6} justifyContent="center">
            <Typography fontSize={30}>{listing.name}</Typography>
            <Box mt="10px">
              <CustomCarousel
                imageUrls={listing.imageUrls}
                width={`${0.25 * width}px`}
                height={`${0.32 * height}px`}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box padding="10px">
              <Tooltip
                sx={{ width: "fit-content" }}
                arrow
                placement="right-end"
                children={
                  <Typography fontSize={22}>
                    By: {currentSeller?.username}
                  </Typography>
                }
                title={
                  <Typography fontSize={18}>{currentSeller?.email}</Typography>
                }
              ></Tooltip>

              <Typography fontSize={22}>
                Description: {listing.description}
              </Typography>
              <Typography fontSize={22}>
                Exchange Location: {listing.exchange_location}
              </Typography>
              <Typography fontSize={22}>
                Payment Methods:{" "}
                {
                  <ul style={{ paddingLeft: "18px", margin: "3px" }}>
                    {listing.payment_methods.map((method, index) => (
                      <li key={index}>{method}</li>
                    ))}
                  </ul>
                }
              </Typography>
              <Typography fontSize={22}>
                Posted: {datePipe(listing.created_at.toString())}{" "}
                {` (${calculateDaysAgo(
                  listing.created_at.toString()
                )} days ago)`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ListingModal;

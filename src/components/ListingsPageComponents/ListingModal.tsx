import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  useTheme,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CustomUser, Listing } from "../../types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CustomCarousel from "../general/CustomCarousel";
import supabase from "../../auth/supabase";
import { calculateDaysAgo, datePipe } from "../../pipes/sellDatePipe";
import { useAuth } from "../../auth/AuthProvider";
import getLocalCurrency from "../general/LocalCurrency";

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
  const { customUser } = useAuth();
  const [currentSeller, setCurrentSeller] = useState<CustomUser>();

  useEffect(() => {
    const handleFetchSeller = async () => {
      if (listing?.seller_id) {
        const { data: Seller, error } = await supabase
          .from("Users")
          .select("*")
          .eq("id", listing.seller_id)
          .single();

        if (error) {
          console.log("Error fetching seller:", error);
        }

        setCurrentSeller(Seller as CustomUser);
      }
    };
    handleFetchSeller();
  }, [listing]);

  const [isLiked, setIsLiked] = useState<boolean>(
    !!listing?.liked_by?.includes(customUser?.id || "")
  );
  const [likes, setLikes] = useState<string[]>(listing?.liked_by ?? []);
  const [listingsLiked, setListingsLiked] = useState<string[]>(
    customUser?.items_liked ?? []
  );

  const handleLikeClick = async () => {
    if (!customUser || !listing || !customUser.id || !listing.id) return;

    const hasLiked = isLiked;
    const updatedLikedBy = hasLiked
      ? likes.filter((id: string) => id !== customUser.id)
      : [...likes, customUser.id];

    setLikes(updatedLikedBy);
    setIsLiked(!isLiked);

    const updatedItemsLiked = hasLiked
      ? listingsLiked.filter((id: string) => id !== listing.id)
      : [...listingsLiked, listing.id];

    setListingsLiked(updatedItemsLiked);

    // Update the liked_by array in Supabase
    const { error: updateError } = await supabase
      .from("Listings")
      .update({ liked_by: updatedLikedBy })
      .eq("id", listing.id);

    if (updateError) {
      console.error("Error updating liked_by:", updateError);
    }

    // Update the user's items_liked array in Supabase
    const { error: userUpdateError } = await supabase
      .from("Users")
      .update({ items_liked: updatedItemsLiked })
      .eq("id", customUser.id);

    if (userUpdateError) {
      console.error("Error updating user items_liked:", userUpdateError);
    }
  };

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
          maxWidth: 0.7 * width,
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            height: "fit-content",
          }}
          position="absolute"
          top="5px"
          right="10px"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton onClick={handleLikeClick}>
            {isLiked ? (
              <FavoriteIcon htmlColor="#e61919" />
            ) : (
              <FavoriteBorderIcon htmlColor="#b8b7b7" />
            )}
          </IconButton>

          <Typography fontSize="17px" paddingX="3px">
            {likes.length}
          </Typography>
        </Box>
        <Grid container sx={{ borderRadius: "12px" }}>
          <Grid item xs={6} justifyContent="center">
            <Typography fontSize={30}>{listing.name}</Typography>
            <Box mt="10px" sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  backgroundColor: theme.palette.customColors.priceSticker,
                  padding: "8px 16px",
                  borderRadius: "10px",
                  boxShadow: ".5px 1px 2.5px #3b4f3c",
                  zIndex: 2,
                }}
              >
                <Typography color="white" textAlign="center" fontWeight="bold">
                  {customUser ? getLocalCurrency(customUser) : ""}
                  {listing.price}
                </Typography>
              </Box>
              <CustomCarousel
                imageUrls={listing.imageUrls}
                width={`${0.25 * width}px`}
                height={`${0.32 * height}px`}
                isSmallArrows
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box padding="10px" marginTop="40px">
              <Tooltip
                sx={{ width: "fit-content" }}
                arrow
                placement="right-end"
                title={
                  <Typography fontSize={18}>{currentSeller?.email}</Typography>
                }
              >
                <Typography fontSize={22}>
                  <strong>by: </strong>
                  {currentSeller?.username}
                </Typography>
              </Tooltip>

              <Typography fontSize={22}>
                <strong>description: </strong>
                {listing.description}
              </Typography>
              <Typography fontSize={22}>
                <strong>exchange location: </strong>
                {listing.exchange_location}
              </Typography>
              <Typography fontSize={22}>
                <strong>payment methods: </strong>
                <ul style={{ paddingLeft: "18px", margin: "3px" }}>
                  {listing.payment_methods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </Typography>
              <Typography fontSize={22}>
                <strong>posted: </strong>
                {datePipe(listing.created_at.toString())}{" "}
                {` (${calculateDaysAgo(
                  listing.created_at.toString()
                )} day/s ago)`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ListingModal;
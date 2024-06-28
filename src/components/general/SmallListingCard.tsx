/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Listing } from "../../types";
import supabase from "../../auth/supabase";
import { useAuth } from "../../auth/AuthProvider";
import getLocalCurrency from "./LocalCurrency";
import { datePipe } from "../../pipes/sellDatePipe";

interface SmallListingCardProps {
  listing: Listing;
  isLikable?: boolean;
  onLikeChange?: () => void;
  onClick: (listing: Listing) => void;
}

const SmallListingCard = ({
  listing,
  isLikable,
  onLikeChange,
  onClick,
}: SmallListingCardProps) => {
  const { customUser } = useAuth();
  const [likeColor, setLikeColor] = useState<string>("#b8b7b7");
  const theme = useTheme();

  useEffect(() => {
    if (listing.liked_by && customUser?.id) {
      if (listing.liked_by.includes(customUser.id)) {
        setLikeColor("#e61919");
      }
    }
  }, [listing.liked_by, customUser]);

  const handleLikeClick = async () => {
    if (!customUser?.id || !listing.id) {
      console.error("User ID or Listing ID is undefined.");
      return;
    }

    // Fetch the current liked_by array
    const { data: currentData, error: fetchError } = await supabase
      .from("Listings")
      .select("liked_by")
      .eq("id", listing.id)
      .single();

    if (fetchError) {
      console.error("Error fetching liked_by:", fetchError);
      return;
    }

    const currentLikedBy: string[] = currentData?.liked_by || [];

    // Check if the user has already liked the listing
    const hasLiked = currentLikedBy.includes(customUser.id);

    // Update the liked_by array
    const updatedLikedBy = hasLiked
      ? currentLikedBy.filter((id: string) => id !== customUser.id)
      : [...currentLikedBy, customUser.id];

    // Update the liked_by array in Supabase
    const { error: updateError } = await supabase
      .from("Listings")
      .update({ liked_by: updatedLikedBy })
      .eq("id", listing.id);

    if (updateError) {
      console.error("Error updating liked_by:", updateError);
      return;
    }

    console.log("Successfully updated liked_by");
    // Update the like color based on the new state
    setLikeColor(hasLiked ? "#b8b7b7" : "#e61919");

    // Notify parent component of the change
    if (onLikeChange) {
      onLikeChange();
    }

    // Fetch the current items_liked array
    const { data: userData, error: userFetchError } = await supabase
      .from("Users")
      .select("items_liked")
      .eq("id", customUser.id)
      .single();

    if (userFetchError) {
      console.error("Error fetching user data:", userFetchError);
      return;
    }

    const currentItemsLiked: string[] = userData?.items_liked || [];

    // Update the user's items_liked array
    const updatedItemsLiked = hasLiked
      ? currentItemsLiked.filter((id: string) => id !== listing.id)
      : [...currentItemsLiked, listing.id];

    const { error: userUpdateError } = await supabase
      .from("Users")
      .update({ items_liked: updatedItemsLiked })
      .eq("id", customUser.id);

    if (userUpdateError) {
      console.error("Error updating user items_liked:", userUpdateError);
    } else {
      console.log("Successfully updated user items_liked");
    }
  };

  const imageUrls = listing.imageUrls;

  return (
    <Box
      onClick={() => onClick(listing)}
      sx={{
        position: "relative",
        borderRadius: "12px",
        boxShadow: 2,
        backgroundColor: theme.palette.customColors.smallListing,
        minWidth: "200px",
        flex: "0 0 auto",
        marginLeft: 1,
        overflow: "clip",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0px 1px 5px #5c5757",
        },
      }}
      height="150px"
    >
      <Box
        sx={{
          position: "absolute",
          top: 5,
          left: 5,
          borderRadius: "12px",
        }}
        width="90px"
        height="80px"
        margin="5px"
      >
        <img
          src={imageUrls[0]}
          width="90px"
          height="80px"
          style={{ borderRadius: "10px", objectFit: "cover" }}
        />
      </Box>

      {listing.date_deleted ? (
        <Box
          width="100%"
          sx={{
            position: "absolute",
            top: "20px",
            marginLeft: "60px",
            transform: "rotate(45deg)",
            backgroundColor: theme.palette.customColors.soldSticker,
            padding: "5px",
            boxShadow: ".5px 1px 2.5px #3d2055",
          }}
        >
          <Typography fontSize={14} color="white" textAlign="center">
            {`sold ${datePipe(listing.date_deleted.toString())}`}
          </Typography>
        </Box>
      ) : (
        <Box
          width="100%"
          sx={{
            position: "absolute",
            top: "20px",
            marginLeft: "60px",
            transform: "rotate(45deg)",
            backgroundColor: theme.palette.customColors.priceSticker,
            padding: "5px",
            boxShadow: ".5px 1px 2.5px #3b4f3c",
          }}
        >
          <Typography color="white" textAlign="center">
            {customUser ? getLocalCurrency(customUser) : ""}
            {listing.price}
          </Typography>
        </Box>
      )}

      <Box
        overflow="hidden"
        width="88%"
        left="6px"
        position="absolute"
        bottom="5px"
        padding="5px"
      >
        <Typography
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {listing.name}
        </Typography>
      </Box>

      {isLikable === true ? (
        <IconButton
          disabled
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleLikeClick}
        >
          <FavoriteIcon htmlColor={likeColor} />
        </IconButton>
      ) : null}
    </Box>
  );
};

export default SmallListingCard;

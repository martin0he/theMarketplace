/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Colors from "../../assets/Colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Listing } from "../../types";
import CustomCarousel from "./CustomCarousel";
import supabase from "../../auth/supabase";
import { useAuth } from "../../auth/AuthProvider";
import getLocalCurrency from "./LocalCurrency";
import { datePipe } from "../../pipes/sellDatePipe";

interface SmallListingCardProps {
  listing: Listing;
  isLikable?: boolean;
  onLikeChange?: () => void;
}

const SmallListingCard = ({
  listing,
  isLikable,
  onLikeChange,
}: SmallListingCardProps) => {
  const { customUser } = useAuth();
  const [likeColor, setLikeColor] = useState<string>("#b8b7b7");

  useEffect(() => {
    if (listing.liked_by && customUser?.id) {
      if (listing.liked_by.includes(customUser.id)) {
        setLikeColor("#e61919");
      }
    }
  }, [listing.liked_by, customUser]);

  const handleLikeClick = async () => {
    if (!customUser?.id) {
      console.error("User ID is undefined.");
      return;
    }

    const currentLikedBy = listing.liked_by || [];

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
      .eq("id", listing.id)
      .select("liked_by");

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

    const currentItemsLiked: string[] = customUser.items_liked || [];

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

  // Assuming the listing has an images property with URLs
  const imageUrls = listing.imageUrls;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "12px",
        boxShadow: 2,
        backgroundColor: Colors.smallListing,
        minWidth: "200px",
        flex: "0 0 auto",
        marginLeft: 1,
        overflow: "clip",
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
        <CustomCarousel
          imageUrls={imageUrls}
          width="90px"
          height="80px"
          isWhiteArrows
          isSmallArrows
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
            backgroundColor: "#8b3fc6",
            padding: "5px",
            boxShadow: ".5px 1px 2.5px #3d2055",
          }}
        >
          <Typography
            fontSize={14}
            fontFamily="inherit"
            color="white"
            textAlign="center"
          >
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
            backgroundColor: "#96b17c",
            padding: "5px",
            boxShadow: ".5px 1px 2.5px #3b4f3c",
          }}
        >
          <Typography fontFamily="inherit" color="white" textAlign="center">
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
          fontFamily="inherit"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {listing.name}
        </Typography>
      </Box>

      {isLikable === true ? (
        <IconButton
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

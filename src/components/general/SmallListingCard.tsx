import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Colors from "../../assets/Colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Listing } from "../../types";
import CustomCarousel from "./CustomCarousel";

interface SmallListingCardProps {
  listing: Listing;
  isLikable?: boolean;
}

const SmallListingCard = ({ listing, isLikable }: SmallListingCardProps) => {
  const [likeColor, setLikeColor] = useState<string>("#b8b7b7");

  const handleLikeClick = () => {
    const newColor = likeColor === "#b8b7b7" ? "#e61919" : "#b8b7b7";
    setLikeColor(newColor);
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

      {listing.dateDeleted ? (
        <Box
          width="100%"
          sx={{
            position: "absolute",
            top: "30px",
            marginLeft: "60px",
            transform: "rotate(45deg)",
            backgroundColor: "#8b3fc6",
            padding: "5px",
          }}
        >
          <Typography fontFamily="inherit" color="white" textAlign="center">
            {`${listing.dateDeleted.getDay()}/${listing.dateDeleted.getDate()}/${listing.dateDeleted.getFullYear()}`}
          </Typography>
        </Box>
      ) : (
        <Box
          width="100%"
          sx={{
            position: "absolute",
            top: "30px",
            marginLeft: "60px",
            transform: "rotate(45deg)",
            backgroundColor: "#96b17c",
            padding: "5px",
          }}
        >
          <Typography fontFamily="inherit" color="white" textAlign="center">
            ${listing.price}
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
      ) : (
        <></>
      )}
    </Box>
  );
};

export default SmallListingCard;

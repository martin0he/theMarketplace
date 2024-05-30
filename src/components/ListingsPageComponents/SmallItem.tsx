// src/components/SmallItem.tsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Listing } from "../../types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useAuth } from "../../auth/AuthProvider";
import getLocalCurrency from "../general/LocalCurrency";

interface SmallItemProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

const SmallItem: React.FC<SmallItemProps> = ({ listing, onClick }) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const { customUser } = useAuth();

  return (
    <Box
      onClick={() => onClick(listing)}
      sx={{
        position: "relative",
        borderRadius: "10px",
        backgroundColor: theme.palette.customColors.smallListing,
        height: 0.22 * height,
        boxShadow: "-1px 2px 1px #5c5757",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 4px 8px #5c5757",
        },
      }}
    >
      <Typography textAlign="center" fontSize="20px" paddingTop="7px">
        {listing.name}
      </Typography>
      <Typography
        paddingX="12px"
        marginTop="5px"
        height="40%"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
        }}
      >
        {listing.description}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: "6px",
          right: "6px",
          width: "auto",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.customColors.priceSticker,
          borderRadius: "10px",
        }}
      >
        <Typography color="white">
          {customUser ? getLocalCurrency(customUser) : ""}
          {listing.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default SmallItem;

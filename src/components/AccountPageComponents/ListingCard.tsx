import { Box, Typography } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Colors from "../../assets/Colors";
import { Listing } from "../../types";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <Box
      borderRadius="12px"
      width={width * 0.65}
      height={height * 0.58}
      sx={{ backgroundColor: Colors.tan }}
      boxShadow="1px 1px 2px #7c6741"
    >
      <Typography>{listing.name}</Typography>
    </Box>
  );
};

export default ListingCard;

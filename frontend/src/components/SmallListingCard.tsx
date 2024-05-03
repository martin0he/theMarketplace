import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Colors from "../assets/Colors";

const settings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface SmallListingCardProps {
  listing: Listing;
}

const SmallListingCard = ({ listing }: SmallListingCardProps) => {
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
          border: 1,
        }}
        width="90px"
        height="80px"
        margin="5px"
      >
        <Slider {...settings}>
          <Box width="90px" height="80px">
            <img
              width="90px"
              style={{ borderRadius: "12px" }}
              height="80px"
              src="https://picsum.photos/90/80"
              alt="Random Image"
            />
          </Box>
          <Box width="90px" height="80px">
            <img
              width="90px"
              style={{ borderRadius: "12px" }}
              height="80px"
              src="https://picsum.photos/90/80"
              alt="Random Image"
            />
          </Box>
          <Box width="90px" height="80px">
            <img
              width="90px"
              style={{ borderRadius: "12px" }}
              height="80px"
              src="https://picsum.photos/90/80"
              alt="Random Image"
            />
          </Box>
          <Box width="90px" height="80px">
            <img
              width="90px"
              style={{ borderRadius: "12px" }}
              height="80px"
              src="https://picsum.photos/90/80"
              alt="Random Image"
            />
          </Box>
          <Box width="90px" height="80px">
            <img
              width="90px"
              style={{ borderRadius: "12px" }}
              height="80px"
              src="https://picsum.photos/90/80"
              alt="Random Image"
            />
          </Box>
          <Box width="90px" height="80px">
            <img
              width="90px"
              style={{ borderRadius: "12px" }}
              height="80px"
              src="https://picsum.photos/90/80"
              alt="Random Image"
            />
          </Box>
        </Slider>
      </Box>

      <Box
        width="100%"
        sx={{
          position: "absolute",
          top: "20px",
          marginLeft: "60px",
          transform: "rotate(45deg)",
          backgroundColor: "#96b17c",
          padding: "5px",
          zIndex: 2,
        }}
      >
        <Typography fontFamily="inherit" color="white" textAlign="center">
          ${listing.price}
        </Typography>
      </Box>

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
          {listing.name}trhrthrthrgrst
        </Typography>
      </Box>
    </Box>
  );
};

export default SmallListingCard;

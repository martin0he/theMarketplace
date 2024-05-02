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
        borderRadius: "12px",
        boxShadow: 2,
        backgroundColor: Colors.smallListing,
        minWidth: "200px",
        flex: "0 0 auto",
        marginLeft: 1,
      }}
      height="150px"
    >
      <Box
        sx={{ borderRadius: "12px" }}
        width="70px"
        height="70px"
        margin="5px"
      >
        <Slider {...settings}>
          <Box width="70px" height="70px">
            <img
              width="70px"
              style={{ borderRadius: "12px" }}
              height="70px"
              src="https://picsum.photos/70/70"
              alt="Random Image"
            />
          </Box>
          <Box width="70px" height="70px">
            <img
              width="70px"
              style={{ borderRadius: "12px" }}
              height="70px"
              src="https://picsum.photos/70/70"
              alt="Random Image"
            />
          </Box>
          <Box width="70px" height="70px">
            <img
              width="70px"
              style={{ borderRadius: "12px" }}
              height="70px"
              src="https://picsum.photos/70/70"
              alt="Random Image"
            />
          </Box>
          <Box width="70px" height="70px">
            <img
              width="70px"
              style={{ borderRadius: "12px" }}
              height="70px"
              src="https://picsum.photos/70/70"
              alt="Random Image"
            />
          </Box>
          <Box width="70px" height="70px">
            <img
              width="70px"
              style={{ borderRadius: "12px" }}
              height="70px"
              src="https://picsum.photos/70/70"
              alt="Random Image"
            />
          </Box>
          <Box width="70px" height="70px">
            <img
              width="70px"
              style={{ borderRadius: "12px" }}
              height="70px"
              src="https://picsum.photos/70/70"
              alt="Random Image"
            />
          </Box>
        </Slider>
      </Box>

      <Typography fontFamily="inherit" textAlign="center" marginTop="35px">
        {listing.name}
      </Typography>
    </Box>
  );
};

export default SmallListingCard;

import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Colors from "../assets/Colors";

interface CustomCarouselProps {
  imageUrls: string[];
  width: string;
  height: string;
  isWhiteArrows?: boolean;
  isSmallArrows?: boolean;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  imageUrls,
  width,
  height,
  isWhiteArrows,
  isSmallArrows,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (imageUrls.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: width,
          height: height,
          borderRadius: "10px",
          backgroundColor: Colors.turquoise,
        }}
      >
        <Typography fontFamily="inherit">No Images</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: width,
        height: height,
        borderRadius: "10px",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img
          src={imageUrls[currentIndex]}
          alt={`Slide ${currentIndex}`}
          style={{
            borderRadius: "10px",
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {imageUrls.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevious}
              sx={{ position: "absolute", left: 0 }}
            >
              {isSmallArrows ? (
                <NavigateBeforeIcon
                  sx={{
                    color: isWhiteArrows ? "white" : "#2c3e68",
                    fontSize: "13px",
                  }}
                />
              ) : (
                <ArrowCircleLeftIcon
                  sx={{
                    color: isWhiteArrows ? "white" : "#2c3e68",
                  }}
                />
              )}
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{ position: "absolute", right: 0 }}
            >
              {isSmallArrows ? (
                <NavigateNextIcon
                  sx={{
                    color: isWhiteArrows ? "white" : "#2c3e68",
                    fontSize: "13px",
                  }}
                />
              ) : (
                <ArrowCircleRightIcon
                  sx={{ color: isWhiteArrows ? "white" : "#2c3e68" }}
                />
              )}
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CustomCarousel;

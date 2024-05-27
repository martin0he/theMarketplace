import React, { useState, useEffect } from "react";
import { Box, IconButton, CircularProgress } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Colors from "../../assets/Colors";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Set loading to true whenever currentIndex changes
  }, [currentIndex]);

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

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false once the image has loaded
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
          backgroundColor: Colors.tan,
          marginTop: "15px",
          border: "2px dotted #312f2f",
        }}
      >
        <ImageNotSupportedIcon fontSize="large" />
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
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <img
          src={imageUrls[currentIndex]}
          alt={`Slide ${currentIndex}`}
          onLoad={handleImageLoad}
          style={{
            display: loading ? "none" : "block",
            borderRadius: "10px",
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            animation: "fadeIn 0.5s",
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

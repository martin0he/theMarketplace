// src/components/ColorGrid.tsx
import React from "react";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const ColorGrid: React.FC = () => {
  const theme = useTheme();
  const colors = [
    { value: theme.palette.customColors.royalBlue },
    { value: theme.palette.customColors.celestialBlue },
    { value: theme.palette.customColors.ghostWhite },
    { value: theme.palette.customColors.cerise },
    { value: theme.palette.customColors.smallListing },
    { value: theme.palette.customColors.inputBG },
    { value: theme.palette.customColors.turquoise },
    { value: theme.palette.customColors.listBoxBG1 },
    { value: theme.palette.customColors.listBoxBG2 },
    { value: theme.palette.customColors.priceSticker },
    { value: theme.palette.customColors.soldSticker },
    { value: theme.palette.customColors.submitButton },
  ];
  const { width, height } = useWindowDimensions();

  return (
    <Box width={0.35 * width} height={0.6 * height} marginTop={"10px"}>
      <Grid container spacing={2}>
        {colors.map((color, index) => (
          <Grid item xs={3} key={index}>
            <Box
              sx={{
                backgroundColor: color.value,
                height: height * 0.8 * 0.07,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                border: "1px solid #000",
                marginBottom: "8px",
              }}
            ></Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ColorGrid;

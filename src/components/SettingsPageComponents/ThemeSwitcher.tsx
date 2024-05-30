// src/ThemeSwitcher.tsx
import React, { useContext } from "react";

import { Button, Container, Grid, Typography, useTheme } from "@mui/material";
import { ThemeContext } from "../../ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { switchTheme } = themeContext;
  const theme = useTheme();

  return (
    <Container>
      <Grid container spacing={2} display="flex" flexDirection="column">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            style={{ color: theme.palette.customColors.cerise }}
          >
            change themes
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              backgroundColor: theme.palette.customColors.submitButton,
              borderRadius: "10px",
              textTransform: "lowercase",
              "&:hover": {
                backgroundColor: theme.palette.customColors.celestialBlue,
              },
            }}
            variant="contained"
            onClick={() => switchTheme("theme1")}
          >
            default
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              backgroundColor: theme.palette.customColors.submitButton,
              borderRadius: "10px",
              textTransform: "lowercase",
              "&:hover": {
                backgroundColor: theme.palette.customColors.celestialBlue,
              },
            }}
            variant="contained"
            onClick={() => switchTheme("theme2")}
          >
            bubblegum
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              backgroundColor: theme.palette.customColors.submitButton,
              borderRadius: "10px",
              textTransform: "lowercase",
              "&:hover": {
                backgroundColor: theme.palette.customColors.celestialBlue,
              },
            }}
            variant="contained"
            onClick={() => switchTheme("theme3")}
          >
            sienna
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              backgroundColor: theme.palette.customColors.submitButton,
              borderRadius: "10px",
              textTransform: "lowercase",
              "&:hover": {
                backgroundColor: theme.palette.customColors.celestialBlue,
              },
            }}
            variant="contained"
            onClick={() => switchTheme("theme4")}
          >
            morning glory blossom
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThemeSwitcher;

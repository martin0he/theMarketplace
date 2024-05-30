// src/ThemeSwitcher.tsx
import React, { useContext } from "react";
import { Button, Grid, useTheme } from "@mui/material";
import { ThemeContext } from "../../ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { switchTheme } = themeContext;
  const theme = useTheme();

  return (
    <Grid
      container
      xs={6}
      spacing={2}
      display="flex"
      flexDirection="column"
      padding="20px"
    >
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
          roasted sienna
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
  );
};

export default ThemeSwitcher;

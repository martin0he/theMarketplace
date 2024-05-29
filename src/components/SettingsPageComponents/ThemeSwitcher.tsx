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
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            style={{ color: theme.palette.customColors.cerise }}
          >
            Theme Switcher
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: theme.palette.customColors.royalBlue }}
            onClick={() => switchTheme("theme1")}
          >
            Theme 1
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: theme.palette.customColors.royalBlue }}
            onClick={() => switchTheme("theme2")}
          >
            Theme 2
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: theme.palette.customColors.royalBlue }}
            onClick={() => switchTheme("theme3")}
          >
            Theme 3
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: theme.palette.customColors.royalBlue }}
            onClick={() => switchTheme("theme4")}
          >
            Theme 4
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThemeSwitcher;

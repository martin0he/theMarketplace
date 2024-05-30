import { Box, Grid, Typography, useTheme } from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";
import ColorGrid from "./ColorGrid";

const AppearanceSection = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h5"
        style={{ color: theme.palette.customColors.cerise }}
      >
        change themes
      </Typography>
      <Grid container display="flex" marginTop={"15px"}>
        <Grid item xs={6}>
          <ThemeSwitcher />
        </Grid>
        <Grid item xs={6}>
          <ColorGrid />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppearanceSection;

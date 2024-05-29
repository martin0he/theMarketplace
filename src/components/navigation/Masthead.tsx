import { Box, Typography, useTheme } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Masthead = () => {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  return (
    <Box
      width={width}
      height="20px"
      sx={{
        position: "fixed",
        bottom: 0,
        backgroundColor: theme.palette.customColors.celestialBlue,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        padding: "4px",
        zIndex: 5,
      }}
    >
      <Typography color={"white"} fontSize="14px">
        martin hema @ northeastern university
      </Typography>
    </Box>
  );
};

export default Masthead;

import { Box, Typography } from "@mui/material";
import Colors from "../assets/Colors";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Masthead = () => {
  const { width } = useWindowDimensions();
  return (
    <Box
      width={width}
      sx={{
        position: "fixed",
        bottom: 0,
        backgroundColor: Colors.celestialBlue,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        padding: "5px",
      }}
    >
      <Typography fontFamily={"inherit"} color={"white"}>
        martin hema @ northeastern university
      </Typography>
    </Box>
  );
};

export default Masthead;
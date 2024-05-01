import { Box, Link, Typography } from "@mui/material";
import Colors from "../assets/Colors";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Navbar = () => {
  const { width, height } = useWindowDimensions();

  return (
    <Box
      sx={{
        backgroundColor: Colors.mainLightGreen,
        width: width,
        height: 0.1 * height,
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        boxShadow: 1,
      }}
    >
      <Link href="/" underline="none" color="inherit">
        <Typography
          fontFamily={"inherit"}
          variant="h4"
          sx={{
            height: "100%",
            justifyContent: "left",
            display: "flex",
            alignItems: "center",
            marginLeft: 0.001 * width,
          }}
        >
          theMarketplace
        </Typography>
      </Link>
    </Box>
  );
};

export default Navbar;

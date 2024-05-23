import { Box, Button, Link, Typography } from "@mui/material";
import Colors from "../../assets/Colors";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Sidebar from "./Sidebar";

import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const { width } = useWindowDimensions();

  return (
    <Box
      sx={{
        backgroundColor: Colors.ghostWhite,
        width: width,
        height: "85px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        boxShadow: 1,
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 5,
      }}
    >
      <Link
        href="/"
        underline="none"
        color="inherit"
        fontFamily="inherit"
        variant="h4"
        sx={{ marginLeft: "20px" }}
      >
        theMarketplace
      </Link>
      {width > 950 ? (
        <Box
          display="flex"
          flexDirection="row"
          py={3}
          width="100%"
          marginRight="30px"
          sx={{
            justifyContent: "right",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            href="/auth"
            sx={{
              marginLeft: "65px",
              fontFamily: "inherit",
              textTransform: "none",
            }}
          >
            <Typography
              fontFamily={"inherit"}
              color="black"
              fontSize={23}
              fontWeight={500}
            >
              listings
            </Typography>
          </Button>

          <Button
            href="/sell"
            sx={{
              marginLeft: "65px",
              fontFamily: "inherit",
              textTransform: "none",
            }}
          >
            <Typography
              fontFamily={"inherit"}
              color="black"
              fontSize={23}
              fontWeight={500}
            >
              sell
            </Typography>
          </Button>

          <Button
            href="/about"
            sx={{
              marginLeft: "65px",
              fontFamily: "inherit",
              textTransform: "none",
            }}
          >
            <Typography
              fontFamily={"inherit"}
              color="black"
              fontSize={23}
              fontWeight={500}
            >
              about
            </Typography>
          </Button>
          <Box marginLeft="55px">
            <AccountMenu />
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          py={3}
          width="100%"
          marginRight="30px"
          sx={{
            justifyContent: "right",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Sidebar />
        </Box>
      )}
    </Box>
  );
};

export default Navbar;

import { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Sidebar from "./Sidebar";
import AccountMenu from "./AccountMenu";
import SignInModal from "../modals/SignInModal";
import SignUpModal from "../modals/SignUpModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.customColors.ghostWhite,
        width: "100%",
        height: "85px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        boxShadow: 1,
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 5,
        padding: { xs: "0 10px", sm: "0 20px" },
        justifyContent: "space-between",
      }}
    >
      <Button
        onClick={() => navigate("/")}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
          textDecoration: "none",
          textTransform: "none",
          color: "inherit",
          padding: "5px",
          marginLeft: "5px",
        }}
      >
        <Typography fontSize={35}>theMarketplace</Typography>
      </Button>
      {width > 950 ? (
        <Box
          display="flex"
          flexDirection="row"
          py={3}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Button
            onClick={() => navigate("/listings")}
            sx={{
              marginLeft: { xs: "20px", sm: "65px" },

              textTransform: "none",
            }}
          >
            <Typography color="black" fontSize={23} fontWeight={500}>
              listings
            </Typography>
          </Button>

          <Button
            onClick={() => navigate("/sell")}
            sx={{
              marginLeft: { xs: "20px", sm: "65px" },

              textTransform: "none",
            }}
          >
            <Typography color="black" fontSize={23} fontWeight={500}>
              sell
            </Typography>
          </Button>

          <Button
            onClick={() => navigate("/about")}
            sx={{
              marginLeft: { xs: "20px", sm: "65px" },

              textTransform: "none",
            }}
          >
            <Typography color="black" fontSize={23} fontWeight={500}>
              about
            </Typography>
          </Button>
          <Box marginLeft={{ xs: "10px", sm: "55px" }}>
            <AccountMenu />
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          py={3}
          width="auto"
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Sidebar
            setSignInModalOpen={setSignInModalOpen}
            setSignUpModalOpen={setSignUpModalOpen}
          />
        </Box>
      )}
      <SignInModal
        isOpen={signInModalOpen}
        handleClose={() => setSignInModalOpen(false)}
      />
      <SignUpModal
        isOpen={signUpModalOpen}
        handleClose={() => setSignUpModalOpen(false)}
      />
    </Box>
  );
};

export default Navbar;

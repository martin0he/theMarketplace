import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import SignUpModal from "./modals/SignUpModal";
import { useAuth } from "../auth/AuthProvider";
import SignInModal from "./modals/SignInModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import { Person } from "@mui/icons-material";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [signUpModalOpen, setSignUpModalOpen] = useState<boolean>(false);
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const { user, signOut, customUser } = useAuth();

  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("sb-egnuwqvtuxctatbhwrfq-auth-token");
  };

  return (
    <>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            fontFamily: "inherit",
          }}
        >
          <Tooltip
            title={
              <Typography fontFamily="Josefin Sans">your account</Typography>
            }
          >
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  padding: "10px",
                  backgroundColor: "#8b3fc6",
                }}
              >
                {customUser !== null ? (
                  <Typography fontFamily="Josefin Sans">
                    {customUser.username.charAt(0).toUpperCase()}
                  </Typography>
                ) : (
                  ""
                )}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        {user === (null || undefined) ? (
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,

                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <Typography fontFamily="Josefin Sans">my account</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <Typography fontFamily="Josefin Sans">settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography fontFamily="Josefin Sans">logout</Typography>
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,

                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => setSignInModalOpen(true)}>
              <LoginIcon />
              <Typography padding="7px" fontFamily="Josefin Sans">
                sign in
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => setSignUpModalOpen(true)}>
              <PersonAddIcon />
              <Typography padding="7px" fontFamily="Josefin Sans">
                sign up
              </Typography>
            </MenuItem>
          </Menu>
        )}
      </React.Fragment>
      <SignUpModal
        isOpen={signUpModalOpen}
        handleClose={() => setSignUpModalOpen(false)}
      />
      <SignInModal
        isOpen={signInModalOpen}
        handleClose={() => setSignInModalOpen(false)}
      />
    </>
  );
};

export default AccountMenu;

import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  setSignInModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ setSignInModalOpen, setSignUpModalOpen }: SidebarProps) => {
  const { customUser, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/listings")}>
            <ListItemText
              primaryTypographyProps={{
                color: "black",
                fontSize: "20px",
              }}
              primary="listings"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/sell")}>
            <ListItemText
              primaryTypographyProps={{
                color: "black",
                fontSize: "20px",
              }}
              primary="sell"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/about")}>
            <ListItemText
              primaryTypographyProps={{
                color: "black",
                fontSize: "20px",
              }}
              primary="about"
            />
          </ListItemButton>
        </ListItem>
        {customUser ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/account")}>
                <ListItemText
                  primaryTypographyProps={{
                    color: "black",
                    fontSize: "20px",
                  }}
                  primary="my account"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/settings")}>
                <ListItemText
                  primaryTypographyProps={{
                    color: "black",
                    fontSize: "20px",
                  }}
                  primary="settings"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => signOut()}>
                <ListItemText
                  primaryTypographyProps={{
                    color: "black",
                    fontSize: "20px",
                  }}
                  primary="logout"
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setSignInModalOpen(true)}>
                <ListItemText
                  primaryTypographyProps={{
                    color: "black",
                    fontSize: "20px",
                  }}
                  primary="sign in"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setSignUpModalOpen(true)}>
                <ListItemText
                  primaryTypographyProps={{
                    color: "black",
                    fontSize: "20px",
                  }}
                  primary="sign up"
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton color="secondary" onClick={() => setOpen(true)}>
        <MenuIcon sx={{ color: "black", fontSize: "27px" }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.customColors.ghostWhite,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;

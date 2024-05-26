import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import Colors from "../../assets/Colors";
import { useAuth } from "../../auth/AuthProvider";

const Sidebar = ({ setSignInModalOpen, setSignUpModalOpen }) => {
  const { customUser, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
      <List>
        <ListItem disablePadding>
          <Link href="/test" underline="none" width="100%">
            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "inherit",
                  color: "black",
                  fontSize: "20px",
                }}
                primary="listings"
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/sell" underline="none" width="100%">
            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "inherit",
                  color: "black",
                  fontSize: "20px",
                }}
                primary="sell"
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/about" underline="none" width="100%">
            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "inherit",
                  color: "black",
                  fontSize: "20px",
                }}
                primary="about"
              />
            </ListItemButton>
          </Link>
        </ListItem>
        {customUser ? (
          <>
            <ListItem disablePadding>
              <Link href="/account" underline="none" width="100%">
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{
                      fontFamily: "inherit",
                      color: "black",
                      fontSize: "20px",
                    }}
                    primary="my account"
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href="/settings" underline="none" width="100%">
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{
                      fontFamily: "inherit",
                      color: "black",
                      fontSize: "20px",
                    }}
                    primary="settings"
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => signOut()}>
                <ListItemText
                  primaryTypographyProps={{
                    fontFamily: "inherit",
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
                    fontFamily: "inherit",
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
                    fontFamily: "inherit",
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
          "& .MuiDrawer-paper": { backgroundColor: Colors.ghostWhite },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;

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
import Colors from "../assets/Colors";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);

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
          <Link href="/test" underline="none" width="100%">
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
          <Link href="/test" underline="none" width="100%">
            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "inherit",
                  color: "black",
                  fontSize: "20px",
                }}
                primary="account"
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/test" underline="none" width="100%">
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
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        color="secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuIcon sx={{ color: "black", fontSize: "27px" }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
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

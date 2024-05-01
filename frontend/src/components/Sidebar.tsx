import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
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
        {["listings", "sell", "account", "about"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "inherit",
                  color: "black",
                  fontSize: "20px",
                }}
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
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
          setOpen(false); // Update to false when closing the drawer
        }}
        sx={{
          "& .MuiDrawer-paper": { backgroundColor: Colors.mainLightGreen },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;

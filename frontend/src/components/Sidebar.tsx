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

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        {["listings", "sell", "account", "about"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
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
        <MenuIcon sx={{ color: "black", fontSize: "22px" }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(true);
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;

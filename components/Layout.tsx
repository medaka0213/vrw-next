import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import ForumIcon from "@mui/icons-material/Forum";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";

import Router from "next/router";

const drawerWidth = 240;

function ResponsiveDrawer(props: React.PropsWithChildren<any>) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"home"} disablePadding>
          <ListItemButton onClick={() => Router.push("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"HOME"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"about"} disablePadding>
          <ListItemButton onClick={() => Router.push("/about")}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"ABOUT"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={"mission"} disablePadding>
          <ListItemButton onClick={() => Router.push("/mission")}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"ミッション"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"mmetup"} disablePadding>
          <ListItemButton onClick={() => Router.push("/meetup")}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"集会"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={"twitter"} disablePadding>
          <ListItemButton
            component="a"
            href="https://twitter.com/vr_launch"
            target="_blank"
          >
            <ListItemIcon>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary={"Twitter @vr_launch"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"calendar"} disablePadding>
          <ListItemButton
            component="a"
            href="https://t.co/nL12021X0s"
            target="_blank"
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={"Googleカレンダー"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"discord"} disablePadding>
          <ListItemButton
            component="a"
            href="https://t.co/cjfnxjZrZG"
            target="_blank"
          >
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary={"Discord"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ロケット打ち上げを観る集会
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: "100%",
          minHeight: "100vh",
          backgroundColor: "#eee",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            border: "1px solid #eaeaea",
            borderRadius: "4px",
            backgroundColor: "transparent",
            p: 1,
            mx: "auto",
            maxWidth: "1280px",
            "@media (min-width: 600px)": {},
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  children: PropTypes.node,
};

export default ResponsiveDrawer;

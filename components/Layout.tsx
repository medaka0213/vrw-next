import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";

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

import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import ForumIcon from "@mui/icons-material/Forum";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Router from "next/router";

import Logo from "../components/Logo";
import { Layout } from "react-vrw";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawer = (
  <div>
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

function ResponsiveDrawer(props: React.PropsWithChildren<any>) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
          backgroundColor: "#004F8A",
        }}
      >
        <Toolbar>
          {!mobileOpen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!mobileOpen && (
            <Logo
              variant="white"
              sx={{
                height: "40px",
              }}
            />
          )}
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
          <DrawerHeader>
            {mobileOpen && (
              <Logo
                variant="jp"
                sx={{
                  height: "40px",
                  mr: "auto",
                  ml: 1,
                }}
              />
            )}
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          {drawer}
        </Drawer>
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerHeader>
            <Logo
              variant="jp"
              sx={{
                height: "40px",
                mr: "auto",
                ml: 1,
              }}
            />
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
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

export const ResponsiveLayout = (props: React.PropsWithChildren<{}>) => {
  return <Layout drawer={drawer}>{props.children}</Layout>;
};

export default ResponsiveDrawer;

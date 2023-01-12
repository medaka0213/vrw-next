import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import ForumIcon from "@mui/icons-material/Forum";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Paper, Typography, Button } from "@mui/material";

import Router from "next/router";

import { Layout, Link } from "react-vrw";

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
          href="https://calendar.google.com/calendar/u/0/embed?src=inoopdemi6k2uss2lktrfl0iu8@group.calendar.google.com"
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
          href="https://discord.com/invite/SBeSSY4xC9"
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

export function Footer() {
  //レイアウト内の一番下に表示されるフッター
  return (
    <Paper
      className="footer"
      sx={{
        justifyContent: "center",
        align: "center",
        width: "100%",
        py: 1,
        zIndex: "drawer",
      }}
      elevation={3}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        flexWrap="wrap"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="caption" align="center" mx={1}>
            <Link href="/">Home</Link>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <Link href="/about">このサイトについて</Link>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <Link href="/mission">ミッション検索</Link>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <Link href="/meetup">集会検索</Link>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="caption" align="center" mx={1}>
            <Link href="https://twitter.com/vr_launch" external>
              Twitter
            </Link>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <Link
              href="https://calendar.google.com/calendar/u/0/embed?src=inoopdemi6k2uss2lktrfl0iu8@group.calendar.google.com"
              external
            >
              カレンダー
            </Link>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <Link href="https://discord.com/invite/SBeSSY4xC9" external>
              Discord
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          height: "100%",
          maxWidth: 1200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary" align="center">
          © 2023 Virtual Rocket Watching
        </Typography>
      </Box>
    </Paper>
  );
}

export const ResponsiveLayout = (props: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Layout bgColor="#004F8A" drawer={drawer}>
        {props.children}
      </Layout>
      <Footer />
    </>
  );
};

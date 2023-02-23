import React from "react";
import dynamic from "next/dynamic";
import Router from "next/router";

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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "next/link";

import { Layout } from "react-vrw";

import MainBox from "./common/MainBox";
import { Link as VRWLink } from "./Link";

const drawer = () => {
  const ListItemLink = ({
    href,
    Icon = HomeIcon,
    target = "_self",
    text = "HOME",
  }: {
    href: string;
    Icon?: any;
    target?: string;
    text?: string;
  }) => {
    return (
      <Link
        href={href}
        passHref
        target={target}
        style={{ textDecoration: "none", color: "#000000de" }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </Link>
    );
  };

  return (
    <div>
      <List>
        <ListItemLink text="HOME" href="/" />
        <ListItemLink text="ABOUT" href="/about" Icon={InfoIcon} />
        <Divider />
        <ListItemLink text="ミッション検索" href="/mission" Icon={SearchIcon} />
        <ListItemLink text="集会検索" href="/meetup" Icon={SearchIcon} />
        <Divider />
        <ListItemLink
          text="Twitter"
          href="https://twitter.com/vr_launch"
          Icon={TwitterIcon}
          target="_blank"
        />
        <ListItemLink
          text="カレンダー"
          href="https://calendar.google.com/calendar/u/0/embed?src=inoopdemi6k2uss2lktrfl0iu8@group.calendar.google.com"
          Icon={EventIcon}
          target="_blank"
        />
        <ListItemLink
          text="Discord"
          href="https://discord.com/invite/SBeSSY4xC9 "
          Icon={ForumIcon}
          target="_blank"
        />
        <Divider />
        <ListItemLink
          text="参加者アンケート"
          href="/form/perticipant"
          Icon={NoteAltOutlinedIcon}
        />
        <ListItemLink
          text="スタッフ参加希望"
          href="/form/staff"
          Icon={NoteAltOutlinedIcon}
        />
      </List>
    </div>
  );
};

export function Footer() {
  //レイアウト内の一番下に表示されるフッター
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        flexWrap="wrap"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink href="/">Home</VRWLink>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink href="/about">このサイトについて</VRWLink>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink href="/mission">打ち上げ検索</VRWLink>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink href="/meetup">集会検索</VRWLink>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink href="https://twitter.com/vr_launch" external>
              Twitter
            </VRWLink>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink
              href="https://calendar.google.com/calendar/u/0/embed?src=inoopdemi6k2uss2lktrfl0iu8@group.calendar.google.com"
              external
            >
              カレンダー
            </VRWLink>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink href="https://discord.com/invite/SBeSSY4xC9" external>
              Discord
            </VRWLink>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink href="/form/perticipant">アンケート</VRWLink>
          </Typography>
          <Typography variant="caption" align="center" mx={1}>
            <VRWLink href="/form/staff">スタッフ参加希望</VRWLink>
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
    </Box>
  );
}

const SideBarItem = dynamic(() => import("./SideBarItem"));

const SideBar = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        py: {
          xs: 0,
          md: 2,
        },
      }}
    >
      <MainBox sx={{ width: "100%", m: 0, p: 0 }}>
        <SideBarItem />
      </MainBox>
    </Box>
  );
};

export const ResponsiveLayout = (props: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Layout
        footer={<Footer />}
        bgColor="#004F8A"
        drawer={drawer()}
        sidebar={<SideBar />}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            p: {
              xs: 0,
              md: 2,
            },
          }}
        >
          {props.children}
        </Box>
      </Layout>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import LinerProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { TabsParent } from "react-vrw";

import { getEvents, getMeetup, getMissions } from "../lib/client";
import MissionIcon from "@/components/MissionIcon";

const SmallItemList = ({ items, loading, ...props }) => {
  return (
    <List {...props}>
      {loading && <LinerProgress />}
      {items.map((item) => {
        return (
          <>
            <Divider key={item.pk + "divider"} />
            <Link
              href={item.itemDetailPath("admin")}
              passHref
              key={item.pk + "link"}
              style={{ textDecoration: "none", color: "#000000de" }}
            >
              <ListItemButton>
                <ListItemAvatar sx={{ minWidth: "36px" }}>
                  <MissionIcon item={item} />
                </ListItemAvatar>
                <ListItemText
                  style={{
                    width: "100%",
                    whiteSpace: "nowrap",
                    display: "block",
                  }}
                >
                  <Typography
                    key="title"
                    variant="caption"
                    component="div"
                    color={"text.primary"}
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {item.itemType() === "meetup"
                      ? item.type.toUpperCase() +
                        ": " +
                        item.get_jp_value("title")
                      : item.missionTitle_JP_Short()}
                  </Typography>
                  <Typography
                    key="datetime"
                    variant="caption"
                    component="div"
                    color={"text.secondary"}
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {item.itemType() === "meetup"
                      ? item.datetime_format()
                      : item.datetime_format_JP}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </Link>
          </>
        );
      })}
    </List>
  );
};

const ItemListByType = ({ type, ...props }) => {
  const router = useRouter();

  const Items = [];
  const [loading, setLoading] = useState(false);
  const [fetchedItems, setFetchedItems] = useState([]);

  const load = async () => {
    setLoading(true);
    let items = [];
    if (type === "mission") {
      items = await getMissions();
    } else if (type === "meetup") {
      items = await getMeetup();
    } else {
      items = await getEvents();
    }
    setFetchedItems(items);
    setLoading(false);
  };

  useEffect(() => {
    if (!Items || !Items.length) {
      load();
    } else {
      setFetchedItems(Items.slice().reverse());
    }
  }, [type]);

  return (
    <>
      <Typography
        variant="caption"
        align="center"
        color={"text.secondary"}
        sx={{
          mx: 2,
        }}
      >
        {Items?.length
          ? "前回の検索結果を表示しています"
          : "最近の項目を表示しています"}
      </Typography>
      <SmallItemList items={fetchedItems} loading={loading} {...props} />
      {type !== "events" && (
        <Button
          variant="outlined"
          onClick={() => router.push(`/${type}`)}
          sx={{
            width: "100%",
          }}
        >
          検索画面へ
        </Button>
      )}
    </>
  );
};

const App = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [prevPath, setPrevPath] = useState(router.pathname);

  useEffect(() => {
    if (router.pathname === "/mission/detail" && prevPath === "/mission") {
      setIndex(1);
    } else if (router.pathname === "/meetup/detail" && prevPath === "/meetup") {
      setIndex(2);
    } else {
      setIndex(0);
    }
    setPrevPath(router.pathname);
  }, [router.pathname]);

  return (
    <TabsParent
      index={index}
      list={[
        {
          title: "カレンダー",
          content: <ItemListByType type="events" />,
        },
        {
          title: "ミッション",
          content: <ItemListByType type="mission" />,
        },
        {
          title: "集会",
          content: <ItemListByType type="meetup" />,
        },
      ]}
    ></TabsParent>
  );
};

export default App;

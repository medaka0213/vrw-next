import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import LinerProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { TabsParent, DEFAULT_QUERY } from "react-vrw";

import { getEvents, fetGetItems } from "../lib/client";
import MissionIcon from "@/components/MissionIcon";

const getParams = (type) => {
  return DEFAULT_QUERY[type]
    ? DEFAULT_QUERY[type]()
    : [
        {
          key: "limit",
          value: 1000,
        },
      ];
};

const SmallItemList = ({ items, loading, ...props }) => {
  return (
    <List {...props}>
      {loading && <LinerProgress />}
      {items.map((item) => {
        return (
          <>
            <Divider key={item.pk + "divider"} />
            <Link
              href={item.itemDetailPath("pub")}
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

const ItemList = ({ mode, ...props }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    let items = await getEvents();
    setItems(items);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [mode]);

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
        ???????????????????????????????????????
      </Typography>
      <SmallItemList items={items} loading={loading} {...props} />
    </>
  );
};

const ItemListByType = ({ type, ...props }) => {
  const router = useRouter();

  const { Items = [] } = useSelector((s) => s.itemReducer[type]);
  const [loading, setLoading] = useState(false);
  const [fetchedItems, setFetchedItems] = useState([]);

  const load = async () => {
    setLoading(true);
    const params = getParams(type);
    let items = await fetGetItems(type, params);
    setFetchedItems(items);
    setLoading(false);
  };

  useEffect(() => {
    if (!Items || !Items.length) {
      load();
    } else {
      setFetchedItems(Items.slice().reverse());
    }
  }, [type, Items]);

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
          ? "?????????????????????????????????????????????"
          : "???????????????????????????????????????"}
      </Typography>
      <SmallItemList items={fetchedItems} loading={loading} {...props} />
      <Button
        variant="outlined"
        onClick={() => router.push(`/${type}`)}
        sx={{
          width: "100%",
        }}
      >
        ???????????????
      </Button>
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
          title: "???????????????",
          content: <ItemList />,
        },
        {
          title: "???????????????",
          content: <ItemListByType type="mission" />,
        },
        {
          title: "??????",
          content: <ItemListByType type="meetup" />,
        },
      ]}
    ></TabsParent>
  );
};

export default App;

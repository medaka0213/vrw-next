import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { CountDownClock } from "react-vrw";

import LinerProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { getEvents } from "../lib/client";
import MissionIcon from "./MissionIcon";

const App = ({ mode, ...props }) => {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    let items = await getEvents(mode);
    setItems(items);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [mode]);

  return (
    <List {...props}>
      {loading && <LinerProgress />}
      {items.map((item) => {
        return (
          <>
            <Divider />
            <ListItemButton
              key={item.pk}
              onClick={() => router.push(item.itemDetailPath("pub"))}
            >
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
          </>
        );
      })}
    </List>
  );
};

export default App;

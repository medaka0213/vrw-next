import * as React from "react";
import Router from "next/router";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { getSearchItems, sort_array } from "react-vrw";

import MissionBadge from "@/components/MissionBadge";
import SortForm from "./SortForm";

export const MissionListItem = ({ item }) => {
  let img_url = item.image_url || item.rocket_image_url;
  if (
    !img_url ||
    img_url ===
      "https://storage.googleapis.com/nextspaceflight/media/rockets/default.jpg"
  ) {
    img_url =
      "https://img.virtualrocketwatching.net/image/image_3636fb8c-5931-4993-82c9-1745ce031d0e.jpeg";
  }

  return (
    <ListItemButton
      alignItems="flex-start"
      onClick={() => Router.push(item.itemDetailPath("pub"))}
    >
      <ListItemAvatar>
        <MissionBadge item={item}>
          <Avatar
            alt="Remy Sharp"
            src={img_url}
            variant="square"
            sx={{ width: 72, height: 72, mr: 2 }}
          />
        </MissionBadge>
      </ListItemAvatar>
      <ListItemText
        primary={item.missionTitle_JP()}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {item.datetime_time_type === "CONFIRMED" && "日本時間"}{" "}
              {item.datetime_format_JP}
            </Typography>
            <Typography>
              {item.get_jp_value("overview") && item.get_jp_value("overview")}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItemButton>
  );
};

const App = ({ items: defaultItems }) => {
  const [items, setItems] = React.useState(defaultItems);
  const [sort, setSort] = React.useState("datetime");
  const [order, setOrder] = React.useState("asc");

  const handleSubmit = ({ sort, order }) => {
    setSort(sort);
    setOrder(order);
  };

  React.useEffect(() => {
    let _items = sort_array(defaultItems, [sort]);
    if (order === "desc") {
      _items.reverse();
    }
    setItems(_items);
  }, [defaultItems, sort, order]);

  return (
    <>
      <Grid container>
        <Grid
          container
          xs={12}
          sx={{
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid xs={12} md={"auto"} py={1} pl={1}>
            <Typography>{defaultItems.length} 件が見つかりました。</Typography>
          </Grid>
          <Grid xs={12} md={8} pb={1} px={1}>
            <SortForm
              onSubmit={handleSubmit}
              keys={getSearchItems("mission")}
              defaultSort="datetime"
              defaultOrder="asc"
            />
          </Grid>
        </Grid>
        {items.map((item, i) => (
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            key={`mission-list-${i}`}
            sx={{
              borderBottom: "1px solid #eee",
            }}
          >
            <MissionListItem item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default App;

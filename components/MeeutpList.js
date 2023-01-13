import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/router";

import MissionBadge from "./MissionBadge";

export const MeeutpListItem = ({ item }) => {
  const router = useRouter();
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
      onClick={() => router.push(item.itemDetailPath("pub"))}
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
        primary={item.title_JP}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              開場 ... 日本時間 {item.datetime_format()}
            </Typography>
            <Typography>
              {item.type === "live" ? "生中継の部" : "アーカイブの部"}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItemButton>
  );
};

const App = ({ items }) => {
  return (
    <List>
      <Grid container>
        {items.map((item, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            xl={4}
            key={`mission-list-${i}`}
            sx={{
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <MeeutpListItem item={item} />
          </Grid>
        ))}
      </Grid>
    </List>
  );
};

export default App;

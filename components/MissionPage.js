import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box, LinearProgress, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import {
  ItemReducer,
  GET_SINGLE_ITEM,
  GET_REFERENCE,
  GET_RELATION,
  Link,
  Youtube,
} from "react-vrw";

import MissionDetailTable from "@/components/MissionDetailTable";
import MainBox from "@/components/common/MainBox";
import Timeline from "@/components/Timeline";
import SlideShow from "@/components/Slide";

const App = ({ type }) => {
  const itemReducer =
    useSelector((s) => s.itemReducer[type]) || new ItemReducer();
  let { Item = {} } = itemReducer;
  const countdown = itemReducer.getRefItem("countdown");
  const slide = itemReducer.getRelItem("slide");

  return (
    <>
      <MainBox
        sx={{
          p: 0,
        }}
      >
        <Card
          sx={{
            display: "flex",
            borderRadius: "0px",
            "@media (max-width: 768px)": { display: "block" },
          }}
        >
          <CardMedia
            component="img"
            image={Item.image_url || Item.rocket_image_url}
            alt={"mission thumbnail"}
            sx={{
              maxWidth: "50%",
              "@media (max-width: 768px)": {
                maxWidth: "100%",
              },
            }}
          />
          <CardContent>
            {Item.image_url ? (
              <Typography variant="caption">
                Image Credit: {Item.image_credit}
              </Typography>
            ) : (
              Item.rocket_image_url && (
                <Typography variant="body2">
                  Image Credit:{" "}
                  <Link href={"http://nextspaceflight.com"} external>
                    nextspaceflight.com
                  </Link>
                </Typography>
              )
            )}
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mt: 3,
                mb: 3,
                pl: 1,
              }}
            >
              {Item.get_jp_value("name")}
            </Typography>
            <MissionDetailTable item={Item} />
          </CardContent>
        </Card>
      </MainBox>
      <MainBox
        sx={{
          p: 0,
        }}
      >
        <Grid container>
          <Grid
            xs={12}
            md={6}
            sx={{
              borderRight: "1px solid #eee",
            }}
          >
            {Item.youtubeId() ? (
              <>
                <Youtube
                  sx={{
                    borderRight: "1px solid #eaeaea",
                  }}
                  videoId={Item.youtubeId()}
                  start={Item.watch_URL_liftoff_at}
                />
                <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                  中継 / アーカイブ動画
                </Typography>
              </>
            ) : (
              Item.youtubeShortId() && (
                <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                  動画は見つかりませんでした
                </Typography>
              )
            )}
          </Grid>
          <Grid
            xs={12}
            md={6}
            sx={{
              borderRight: "1px solid #eee",
            }}
          >
            {Item.youtubeShortId() ? (
              <>
                <Youtube videoId={Item.youtubeShortId()} />
                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: "center", pb: 1 }}
                >
                  切り抜き動画
                </Typography>
              </>
            ) : (
              Item.youtubeId() && (
                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: "center", pb: 1 }}
                >
                  切り抜き動画は見つかりませんでした
                </Typography>
              )
            )}
          </Grid>
        </Grid>
      </MainBox>
      {slide && (
        <MainBox>
          <SlideShow slide={slide} />
        </MainBox>
      )}
      {countdown && (
        <MainBox
          sx={{
            p: 0,
          }}
        >
          <Grid container>
            <Grid xs={12} md={6} sx={{}}>
              <Timeline
                countdown={countdown}
                mode="t_minus"
                datetime={Item.datetime}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{
                border: "1px solid #eee",
              }}
            >
              <Timeline
                countdown={countdown}
                mode="t_plus"
                datetime={Item.datetime}
              />
            </Grid>
          </Grid>
        </MainBox>
      )}
    </>
  );
};

export default App;

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ItemReducer, Youtube, DialogWrapper, Launch } from "react-vrw";

import { Link } from "@/components/Link";
import MissionDetailTable from "@/components/MissionDetailTable";
import MainBox from "@/components/common/MainBox";
import Timeline from "@/components/Timeline";
import SlideShow from "@/components/Slide";

const App = ({ type }) => {
  const itemReducer =
    useSelector((s) => s.itemReducer[type]) || new ItemReducer();
  let { Item = new Launch() } = itemReducer;
  const countdown = itemReducer.getRefItem("countdown");
  const slide = itemReducer.getRelItem("slide");
  const meetup = itemReducer.getRelList("meetup");

  const ImageDialog = () => (
    <DialogWrapper>
      <img
        src={Item.image_url || Item.rocket_image_url}
        alt={"mission thumbnail"}
        width="100%"
        style={{ maxWidth: "100vw", maxHeight: "90vh" }}
      />
      {Item.image_url ? (
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Image Credit: {Item.image_credit}
        </Typography>
      ) : (
        Item.rocket_image_url && (
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Image Credit: via{" "}
            <Link href={"http://nextspaceflight.com"} external>
              nextspaceflight.com
            </Link>
          </Typography>
        )
      )}
    </DialogWrapper>
  );

  return (
    <>
      <MainBox
        sx={{
          p: 0,
        }}
      >
        <Grid container>
          <Grid
            xs={6}
            display={{
              xs: "none",
              lg: "block",
            }}
          >
            <ImageDialog />
          </Grid>
          <Grid
            xs={12}
            lg={6}
            sx={{
              p: 2,
            }}
          >
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
            <MissionDetailTable item={Item} meetup={meetup} />
          </Grid>
        </Grid>
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
                  <Link href={Item.watch_URL || Item.watch_URL_option} external>
                    ?????? / ?????????????????????
                  </Link>
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                ???????????????????????????????????????
              </Typography>
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
                  <Link href={Item.watch_URL_short} external>
                    ??????????????????
                  </Link>
                </Typography>
              </>
            ) : (
              <Typography
                variant="subtitle2"
                sx={{ textAlign: "center", pb: 1 }}
              >
                ???????????????????????????????????????????????????
              </Typography>
            )}
          </Grid>
        </Grid>
      </MainBox>
      {slide && (
        <MainBox
          sx={{
            p: 0,
          }}
        >
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

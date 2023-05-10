import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Youtube, DialogWrapper } from "react-vrw";

import { Link } from "@/components/Link";
import MissionDetailTable from "@/components/MissionDetailTable";
import MainBox from "@/components/common/MainBox";
import Timeline from "@/components/Timeline";
import SlideShow from "@/components/Slide";

const App = ({ data }) => {
  let {item, slide, meetup, countdown} = data;
  const ImageDialog = () => (
    <DialogWrapper>
      <img
        src={data.thumbnail()}
        alt={"mission thumbnail"}
        width="100%"
        style={{ maxWidth: "100vw", maxHeight: "90vh" }}
      />
      {item.image_url ? (
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Image Credit: {item.image_credit}
        </Typography>
      ) : (
        item.rocket_image_url && (
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
              variant="h5"
              sx={{
                fontWeight: "bold",
                mt: 3,
                mb: 3,
                pl: 1,
              }}
            >
              {data.title()}
            </Typography>
            <MissionDetailTable item={item} meetup={meetup} />
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
            {item.youtubeId() ? (
              <>
                <Youtube
                  sx={{
                    borderRight: "1px solid #eaeaea",
                  }}
                  videoId={item.youtubeId()}
                  start={item.watch_URL_liftoff_at}
                />
                <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                  <Link href={item.watch_URL || item.watch_URL_option} external>
                    中継 / アーカイブ動画
                  </Link>
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                動画は見つかりませんでした
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
            {item.youtubeShortId() ? (
              <>
                <Youtube videoId={item.youtubeShortId()} />

                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: "center", pb: 1 }}
                >
                  <Link href={item.watch_URL_short} external>
                    切り抜き動画
                  </Link>
                </Typography>
              </>
            ) : (
              <Typography
                variant="subtitle2"
                sx={{ textAlign: "center", pb: 1 }}
              >
                切り抜き動画は見つかりませんでした
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
                datetime={item.datetime}
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
                datetime={item.datetime}
              />
            </Grid>
          </Grid>
        </MainBox>
      )}
    </>
  );
};

export default App;

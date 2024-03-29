import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ImagePreview } from "@medaka0213/react-vrw";

import { MissionDetail } from "@/lib/models";
import { Link } from "@/components/Link";
import MissionDetailTable from "@/components/MissionDetailTable";
import Timeline from "@/components/Timeline";
import SlideShow from "@/components/Slide";
import MainBox from "@/components/common/MainBox";
import VideoPreview from "@/components/common/VideoPreview";

const App = ({ data }: { data: MissionDetail }) => {
  let { item, slide, meetup, countdown } = data;
  const ImageDialog = () => (
    <ImagePreview src={data.thumbnail()} alt={"thumbnail"}>
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
    </ImagePreview>
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
            <MissionDetailTable item={item} meetup={meetup || []} />
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
            <VideoPreview
              url={item.watch_URL_option || item.watch_URL}
              title="中継 / アーカイブ動画"
              seek_offset={item.watch_URL_liftoff_at}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            sx={{
              borderRight: "1px solid #eee",
            }}
          >
            <VideoPreview url={item.watch_URL_short} title="切り抜き動画" />
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

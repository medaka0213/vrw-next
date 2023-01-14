import React from "react";
import { useSelector } from "react-redux";

import { Grid, Box, Typography } from "@mui/material";

import { ItemReducer, DialogWrapper, Meetup } from "react-vrw";
import { Link } from "@/components/Link";

import MeeutpDetailTable from "@/components/MeeutpDetailTable";
import MainBox from "@/components/common/MainBox";

const App = ({ type }) => {
  const itemReducer =
    useSelector((s) => s.itemReducer[type]) || new ItemReducer();
  let { Item = new Meetup() } = itemReducer;

  const event = itemReducer.getRefItem(Item.get_paretnt_type());

  const images = itemReducer.getRelList("image");
  let poster_jp = images.length
    ? images.filter((img) => img.name.endsWith("JP"))
    : null;
  poster_jp = poster_jp.length ? poster_jp[0].src() : null;

  const ImageDialog = () => (
    <DialogWrapper>
      <img
        src={
          poster_jp ||
          Item.image_url ||
          Item.rocket_image_url ||
          "https://img.virtualrocketwatching.net/image/image_3636fb8c-5931-4993-82c9-1745ce031d0e.jpeg"
        }
        alt={"mission thumbnail"}
        width={"100%"}
        height={"auto"}
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
              variant="h5"
              sx={{
                fontWeight: "bold",
                mt: 3,
                mb: 3,
                pl: 1,
              }}
            >
              {Item.type.toUpperCase()}: {Item.get_jp_value("title")}
            </Typography>
            <MeeutpDetailTable item={Item} event={event} />
          </Grid>
          <Grid
            xs={12}
            display={{
              xs: "block",
              lg: "none",
            }}
          >
            <ImageDialog />
          </Grid>
        </Grid>
      </MainBox>
    </>
  );
};

export default App;

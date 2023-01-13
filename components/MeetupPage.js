import React from "react";
import { useSelector } from "react-redux";

import { Grid, Box, Typography } from "@mui/material";

import { ItemReducer, Link, DialogWrapper, Meetup } from "react-vrw";

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

  return (
    <>
      <MainBox
        sx={{
          p: 0,
        }}
      >
        <Grid container>
          <Grid xs={12} md={6}>
            <DialogWrapper>
              <img
                src={poster_jp || Item.image_url || Item.rocket_image_url}
                alt={"mission thumbnail"}
                width={"100%"}
                height={"auto"}
              />
            </DialogWrapper>
          </Grid>
          <Grid
            xs={12}
            md={6}
            sx={{
              p: 2,
            }}
          >
            {!poster_jp && Item.image_url && (
              <Typography variant="caption">
                Image Credit: {Item.image_credit}
              </Typography>
            )}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mt: 3,
                mb: 3,
                pl: 1,
              }}
            >
              {Item.get_jp_value("title")}
            </Typography>
            <MeeutpDetailTable item={Item} event={event} />
            <Typography
              sx={{
                fontWeight: "bold",
                mt: 3,
                mb: 3,
                pl: 1,
              }}
            >
              <Link href={event.itemDetailPath("pub")}>
                ミッションの詳細情報はこちら
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </MainBox>
    </>
  );
};

export default App;

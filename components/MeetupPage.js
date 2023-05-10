import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { DialogWrapper } from "react-vrw";
import { Link } from "@/components/Link";

import MeeutpDetailTable from "@/components/MeeutpDetailTable";
import MainBox from "@/components/common/MainBox";

const App = ({ data }) => {
  let { item, mission } = data;

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
              {item.type.toUpperCase()}: {item.get_jp_value("title")}
            </Typography>
            <MeeutpDetailTable item={item} event={mission} />
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

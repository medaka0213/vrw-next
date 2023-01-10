import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box, LinearProgress, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import {
  ItemReducer,
  GET_SINGLE_ITEM,
  GET_REFERENCE,
  GET_RELATION,
  Link,
} from "react-vrw";

import MissionDetailTable from "@/components/MissionDetailTable";

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pk = "" } = router.query;
  const type = pk.split("_")[0];

  const itemReducer =
    useSelector((s) => s.itemReducer[type]) || new ItemReducer();
  const { Item = {} } = itemReducer;
  const isReceived =
    itemReducer.isReceived &&
    itemReducer.isReferenceReceived &&
    itemReducer.isRelationReceived;

  const load = () => {
    if (pk) {
      dispatch(GET_SINGLE_ITEM({ pk, type }));
      dispatch(GET_REFERENCE({ pk, type }));
      dispatch(GET_RELATION({ pk, type }));
    }
  };

  useEffect(() => {
    load();
  }, [pk]);

  return (
    <>
      {!isReceived && <LinearProgress />}
      {isReceived && (
        <Box
          sx={{
            m: 1,
            mb: 2,
            border: "1px solid #eaeaea",
            borderRadius: "4px",
            backgroundColor: "background.paper",
          }}
        >
          <Card
            sx={{
              display: "flex",
              "@media (max-width: 720px)": { display: "block" },
            }}
          >
            <CardMedia
              component="img"
              image={Item.image_url || Item.rocket_image_url}
              alt={"mission thumbnail"}
              sx={{
                maxWidth: "50%",
                "@media (max-width: 720px)": {
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
        </Box>
      )}
    </>
  );
};

export default App;

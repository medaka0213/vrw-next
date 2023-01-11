import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box, LinearProgress, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ItemListTable } from "react-vrw";

import {
  ItemReducer,
  GET_SINGLE_ITEM,
  GET_REFERENCE,
  GET_RELATION,
  Link,
  Youtube,
} from "react-vrw";

import MissionDetailTable from "@/components/MissionDetailTable";

function generateRandom() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pk = "" } = router.query;
  const type = pk.split("_")[0];

  const itemReducer =
    useSelector((s) => s.itemReducer[type]) || new ItemReducer();
  let { Item = {} } = itemReducer;
  let countdown = null;
  let isReceived =
    itemReducer.isReceived &&
    itemReducer.isReferenceReceived &&
    itemReducer.isRelationReceived;

  if (isReceived) {
    countdown = itemReducer.getRefItem("countdown");
  }

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
        <>
          <Box
            sx={{
              m: 1,
              mb: 2,
              border: "1px solid #eaeaea",
              borderRadius: "4px",
              backgroundColor: "transparent",
            }}
          >
            <Card
              sx={{
                display: "flex",
                borderRadius: "0px",
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

            <Grid
              container
              sx={{
                my: 2,
                backgroundColor: "background.paper",
              }}
            >
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
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ textAlign: "center" }}
                    >
                      中継 / アーカイブ動画
                    </Typography>
                  </>
                ) : (
                  Item.youtubeShortId() && (
                    <Typography
                      variant="subtitle2"
                      sx={{ textAlign: "center" }}
                    >
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
                      中継アーカイブ (切り抜き)
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
            <Box
              sx={{
                my: 2,
                height: 400,
                width: "100%",
                backgroundColor: "background.paper",
              }}
            >
              <ItemListTable
                sx={{
                  my: 2,
                }}
                columns={[
                  {
                    field: "t",
                    headerName: "T -",
                  },
                  {
                    field: "desc_jp",
                    headerName: " ",
                  },
                ]}
                rows={countdown.t_minus.map((e, i) => {
                  return {
                    t: `${String(e.hours).padStart(2, "0")}:${String(
                      e.minutes
                    ).padStart(2, "0")}:${String(e.seconds).padStart(2, "0")}`,
                    ...e,
                  };
                })}
                getRowId={(row) => generateRandom()}
                rowsPerPageOptions={[5]}
              />
              <ItemListTable
                sx={{
                  my: 2,
                }}
                columns={[
                  {
                    field: "t",
                    headerName: "T +",
                  },
                  {
                    field: "desc_jp",
                    headerName: " ",
                  },
                ]}
                rows={countdown.t_plus.map((e, i) => {
                  return {
                    t: `${String(e.hours).padStart(2, "0")}:${String(
                      e.minutes
                    ).padStart(2, "0")}:${String(e.seconds).padStart(2, "0")}`,
                    ...e,
                  };
                })}
                getRowId={(row) => generateRandom()}
                rowsPerPageOptions={[5]}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default App;

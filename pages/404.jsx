import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OgpHead from "@/components/OgpHead";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <OgpHead />
      <Box
        sx={{
          m: 4,
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h2">404 - Page Not Found</Typography>
        <Typography variant="p">
          お探しのページは見つかりませんでした。
        </Typography>
      </Box>
    </>
  );
};

export default App;

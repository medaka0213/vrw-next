import { Box, Typography } from "@mui/material";

const App = ({ Component, pageProps }) => {
  return (
    <Box sx={{ m:4, justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Typography variant="h2" >
        404 - Page Not Found
      </Typography>
      <Typography variant="p" >
        お探しのページは見つかりませんでした。
      </Typography>
    </Box>
  );
};

export default App;

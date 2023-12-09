import React from "react";
import Typography from "@mui/material/Typography";
import MainBox from "@/components/common/MainBox";

const App = () => {
  return (
    <MainBox
      sx={{
        p: 4,
      }}
    >
      <Typography variant="h3">500 - Internal Server Error</Typography>
      <Typography>エラーが発生しました。</Typography>
    </MainBox>
  );
};

export default App;

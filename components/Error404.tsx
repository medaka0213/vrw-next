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
      <Typography variant="h3">404 - Not Found</Typography>
      <Typography>お探しのページは見つかりませんでした。</Typography>
    </MainBox>
  );
};

export default App;

import React from "react";
import Paper from "@mui/material/Paper";

const App = ({ sx = {}, children, ...props }) => {
  return (
    <Paper
      sx={{
        mb: 2,
        p: {
          xs: 0,
          sm: 2,
        },
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

export default App;

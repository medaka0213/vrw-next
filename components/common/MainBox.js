import React from "react";
import Paper from "@mui/material/Paper";

const App = ({ sx = {}, children, Component = Paper, ...props }) => {
  return (
    <Component
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
    </Component>
  );
};

export default App;

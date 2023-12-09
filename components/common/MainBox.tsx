import React from "react";
import Paper from "@mui/material/Paper";

const App = ({
  sx = {},
  children,
  Component = Paper,
  ...props
}: {
  sx?: any;
  children: any;
  Component?: any;
}) => {
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
      {...props}
    >
      {children}
    </Component>
  );
};

export default App;

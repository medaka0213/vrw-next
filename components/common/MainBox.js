import { Paper } from "@mui/material";

const App = ({ sx = {}, children, ...props }) => {
  return (
    <Paper
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: "background.paper",
        ...sx,
        "@media (max-width: 768px)": {
          p: 0,
        },
      }}
    >
      {children}
    </Paper>
  );
};

export default App;

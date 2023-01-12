import { Box } from "@mui/material";

const App = ({ sx = {}, children, ...props }) => {
  return (
    <Box
      sx={{
        mb: 1,
        mx: 1,
        p: 2,
        width: "100%",
        backgroundColor: "background.paper",
        ...sx,
        "@media (max-width: 768px)": {
          mx: 0,
          my: 0,
          p: 0,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default App;

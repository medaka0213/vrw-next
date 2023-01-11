import { Box } from "@mui/material";

const App = ({ sx = {}, children, ...props }) => {
  return (
    <Box
      sx={{
        my: 2,
        p: 2,
        width: "100%",
        backgroundColor: "background.paper",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default App;

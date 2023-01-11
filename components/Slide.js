import { Box } from "@mui/material";
import { SlideShow } from "react-vrw";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = ({ slide, ...props }) => {
  return (
    <Box {...props}>
      <SlideShow images={slide.imageLinks()} {...props} />;
    </Box>
  );
};

export default App;

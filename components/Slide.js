import { Box, Typography } from "@mui/material";
import { SlideShow, Link } from "react-vrw";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = ({ slide, ...props }) => {
  return (
    <Box {...props}>
      <SlideShow
        images={slide.imageLinks()}
        sx={{
          border: "1px solid #e0e0e0",
        }}
      />
      <Typography
        align={"center"}
        sx={{
          py: 1,
        }}
        component={"div"}
        variant={"caption"}
      >
        スライド資料: {slide.user} /
        <Link
          href={"https://creativecommons.org/licenses/by-sa/4.0/deed.ja"}
          external
        >
          CC-BY-SA 4.0
        </Link>
      </Typography>
    </Box>
  );
};

export default App;

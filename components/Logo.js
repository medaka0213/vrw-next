import React from "react";
import Box from "@mui/material/Box";

const logo_white =
  "https://img.virtualrocketwatching.net/image/image_4524f41a-0cb4-470f-b0c2-5dbddb9ff8b4.svg";
const logo_jp =
  "https://img.virtualrocketwatching.net/image/image_4f7d6ac8-9c74-4ef5-a917-44129992ca44.svg";
const logo_en =
  "https://img.virtualrocketwatching.net/image/image_21912965-e900-4ae4-a902-910d6b188b59.svg";

const Logo = ({ variant = "jp", sx }) => {
  let logo = null;
  switch (variant) {
    case "white":
      logo = logo_white;
      break;
    case "en":
      logo = logo_en;
      break;
    default:
      logo = logo_jp;
      break;
  }
  return (
    <Box sx={{ textAlign: "center", ...sx }}>
      <img src={logo} alt="logo" width="100%" height={"100%"} />
    </Box>
  );
};

export default Logo;

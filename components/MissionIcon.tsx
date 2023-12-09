import { getColor } from "../lib/item";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import ThreePIcon from "@mui/icons-material/ThreeP";

const App = ({
  children,
  item = {},
  sx,
  ...props
}: {
  children?: any;
  item: any;
  sx?: any;
}) => {
  const color = getColor(item).color;
  sx = { color, ...sx };
  return item.itemType() === "meetup" ? (
    <ThreePIcon sx={sx} {...props} />
  ) : item.itemType() === "launch" ? (
    <RocketLaunchIcon sx={sx} {...props} />
  ) : (
    <SatelliteAltIcon sx={sx} {...props} />
  );
};

export default App;

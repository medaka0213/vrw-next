import Badge from "@mui/material/Badge";
import { getColor } from "../lib/item";

const App = ({ children, item = {}, ...props }) => {
  return (
    <Badge
      badgeContent={getColor(item).jp}
      color={getColor(item).badgeColor}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      {...props}
    >
      {children}
    </Badge>
  );
};

export default App;

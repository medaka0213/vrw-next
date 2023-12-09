import Badge from "@mui/material/Badge";
import { getColor } from "../lib/item";

const App = ({
  children,
  item = {},
  ...props
}: {
  children: any;
  item?: any;
}) => {
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

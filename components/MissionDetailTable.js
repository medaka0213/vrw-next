import DetailTable from "./DetailTable";
import { Link } from "react-vrw";

const App = ({ item, sx }) => {
  console.log("item", item);
  const items_launch = [
    {
      key: "日時",
      value: item.datetime_format_JP,
    },
    {
      key: "ミッション名",
      value: item.get_jp_value("name"),
    },
    {
      key: "ミッション概要",
      value: item.get_jp_value("overview"),
    },
    {
      key: "ロケット",
      value: item.get_jp_value("rocket"),
    },
    {
      key: "打ち上げ事業者",
      value: item.get_jp_value("provider"),
    },
    {
      key: "発射場",
      value: item.get_jp_value("site"),
    },
    {
      key: "関連リンク",
      value: (
        <Link href={item.nextSpaceFlightLink()} external>
          nextspaceflight.com
        </Link>
      ),
    },
  ];
  const items_event = [
    {
      key: "日時",
      value: item.datetime_format_JP,
    },
    {
      key: "ミッション名",
      value: item.get_jp_value("name"),
    },
    {
      key: "関連リンク",
      value: (
        <Link href={item.nextSpaceFlightLink()} external>
          nextspaceflight.com
        </Link>
      ),
    },
  ];

  return (
    <DetailTable
      items={item.itemType() === "launch" ? items_launch : items_event}
      sx={sx}
    />
  );
};
export default App;

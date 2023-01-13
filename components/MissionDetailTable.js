import DetailTable from "./DetailTable";
import { Link, CountDownClock } from "react-vrw";
import { Typography } from "@mui/material";

const App = ({ item, sx }) => {
  console.log("item", item);
  const items_launch = [
    {
      key: "カウントダウン",
      value:
        item.datetime_time_type === "CONFIRMED" ? (
          <CountDownClock datetime_iso={item.datetime} />
        ) : (
          "打ち上げ時刻が確定していません"
        ),
    },
    {
      key: "日時",
      value: item.datetime_format_JP,
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
      key: "カウントダウン",
      value:
        item.datetime_time_type === "CONFIRMED" ? (
          <CountDownClock datetime_iso={item.datetime} />
        ) : (
          "打ち上げ時刻が確定していません"
        ),
    },
    {
      key: "日時",
      value: item.datetime_format_JP,
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

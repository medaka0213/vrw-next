import DetailTable from "./DetailTable";
import { Link, CountDownClock, TimeRange } from "react-vrw";
import { Typography, Box } from "@mui/material";
import { getColor } from "../lib/item";

const App = ({ item, event, sx }) => {
  console.log("item", item);
  const items = [
    {
      key: "状態",
      value: getColor(item).jp + " (" + getColor(item).en.toUpperCase() + ")",
      sx: {
        color: getColor(item).color,
      },
    },
    {
      key: "ミッション情報",
      value: (
        <Link
          href={{
            pathname: "/mission/detail",
            query: {
              pk: event.pk,
            },
          }}
        >
          {event.missionTitle_JP_Short()}
        </Link>
      ),
    },
    {
      key: "日時",
      value: item.datetime_format(),
    },
    {
      key: "集会タイプ",
      value:
        item.type === "live" ? "生中継の部 [LIVE]" : "アーカイブの部 [ARCHIVE]",
    },
    {
      key: "参加方法 (VRChat)",
      value: `${item.user} にフレンド登録 & JOIN`,
    },
    {
      key: "関連リンク",
      value: (
        <>
          {item.tweet_JP && (
            <Box mb={1}>
              <Link href={item.twitterLinkJP()} external>
                Twitter (告知ツイート)
              </Link>
            </Box>
          )}
        </>
      ),
    },
    {
      key: "もっと調べる",
      value: (
        <>
          <Link
            href={`/meetup?datetime=${TimeRange.fromMode(item.datetime, "YEAR")
              .toString()
              .replace("datetime=", "")}&limit=1000`}
          >
            {item.datetime.split("-")[0]}年
          </Link>
          の集会一覧
        </>
      ),
    },
  ];

  return <DetailTable items={items} sx={sx} />;
};
export default App;

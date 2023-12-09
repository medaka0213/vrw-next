import DetailTable from "./DetailTable";
import { TimeRange } from "@medaka0213/react-vrw";
import { Launch, Event, Meetup } from "@medaka0213/react-vrw";

import Box from "@mui/material/Box";

import SearchIcon from "@mui/icons-material/Search";
import { Link } from "@/components/Link";

import { getColor } from "@/lib/item";
import { timeRangeForWeekly } from "@/lib/time";

const App = ({
  item,
  event,
  sx,
}: {
  item: Meetup;
  event?: Launch | Event;
  sx?: any;
}) => {
  let missionPath;
  let missionName;
  if (item.type === "weekly") {
    let timeRange = timeRangeForWeekly(item.datetime);
    missionPath = `/mission/?datetime=${timeRange.start}...${timeRange.end}`;
    missionName = `過去一週間の振り返り: ${item.datetime_format()}`;
  } else if (event) {
    missionPath = `/mission/detail?pk=${event.pk}`;
    missionName = event.missionTitle_JP_Short();
  }

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
        <Link href={missionPath || "/mission"}>
          {missionName}
          <SearchIcon
            sx={{
              fontSize: "0.8rem",
              ml: 0.25,
              mt: 0.5,
              transform: "scale(-1, 1)",
            }}
          />
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
            <SearchIcon
              sx={{
                fontSize: "0.8rem",
                ml: 0.25,
                mt: 0.5,
                transform: "scale(-1, 1)",
              }}
            />
          </Link>
          の集会一覧
        </>
      ),
    },
  ];

  return <DetailTable items={items} sx={sx} />;
};
export default App;

import DetailTable from "./DetailTable";
import { Link } from "react-vrw";
import { Typography, Box } from "@mui/material";

const App = ({ item, event, sx }) => {
  console.log("item", item);
  const items = [
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
      key: "JOIN先",
      value: `VRChat: ${item.user} にJOIN`,
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
  ];

  return <DetailTable items={items} sx={sx} />;
};
export default App;

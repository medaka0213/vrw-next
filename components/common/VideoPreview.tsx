import {
  Youtube,
  extractIdFromUrl,
  isYoutubeUrl,
  isTwitterUrl,
  format_timedelta,
} from "@medaka0213/react-vrw";
import { Link } from "@/components/Link";
import OGPLoad from "@/components/common/OGPLoad";
import { Tweet } from "react-twitter-widgets";

import Typography from "@mui/material/Typography";

const App = ({
  url,
  title,
  seek_offset = 0,
}: {
  url: string;
  title?: string;
  seek_offset?: number;
}) => {
  const id = extractIdFromUrl(url);
  const _url = isYoutubeUrl(url)
    ? `https://www.youtube.com/watch?v=${id}&t=${seek_offset}`
    : url;

  const CommonPreview = ({ children }: { children?: React.ReactNode }) => (
    <>
      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
        <Link href={_url} external>
          {title || _url}{" "}
          {Boolean(seek_offset) && `(${format_timedelta(seek_offset)})`}
        </Link>
      </Typography>
      {children}
    </>
  );

  return !url ? (
    <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
      動画は見つかりませんでした
    </Typography>
  ) : isYoutubeUrl(url) ? (
    <>
      <CommonPreview>
        <Youtube
          sx={{
            borderRight: "1px solid #eaeaea",
          }}
          videoId={id}
          start={seek_offset}
          width={"100%"}
        />
      </CommonPreview>
    </>
  ) : isTwitterUrl(url) && url.includes("/status/") ? (
    <>
      <CommonPreview>
        <Tweet tweetId={id} />
      </CommonPreview>
    </>
  ) : (
    <CommonPreview>
      <OGPLoad url={url} image_height="200" />
    </CommonPreview>
  );
};

export default App;

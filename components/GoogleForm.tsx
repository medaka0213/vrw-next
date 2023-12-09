import { Typography } from "@mui/material";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

import { Link } from "@/components/Link";

const iconWrapStyle = {
  display: "inline-flex",
  VerticalAlign: "text-bottom",
  BoxSizing: "inherit",
  textAlign: "center",
  AlignItems: "center",
};

const App = ({ url, height = "2000px" }: { url: string; height?: string }) => {
  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        <Link href={url} sx={iconWrapStyle} external>
          <NoteAltOutlinedIcon sx={{ mr: 0.5 }} />
          フォームが表示されない場合こちら
        </Link>
      </Typography>
      <iframe
        src={url}
        width="100%"
        height={height}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
      >
        読み込んでいます…
      </iframe>
    </>
  );
};

export default App;

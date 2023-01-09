import { Box, Typography, Grid } from "@mui/material";
import { Link } from "react-vrw";

import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import ForumIcon from "@mui/icons-material/Forum";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

const iconWrapStyle = {
  display: "inline-flex",
  VerticalAlign: "text-bottom",
  BoxSizing: "inherit",
  textAlign: "center",
  AlignItems: "center",
};

const App = ({ sx }) => {
  return (
    <Box
      sx={{
        display: "block",
        ...sx,
      }}
    >
      <Typography variant="h5">
        「ロケット打ち上げを観る集会」について
      </Typography>
      <Typography>
        VRChatでロケットの打ち上げ生中継・アーカイブ動画を同時視聴する、パブリックビューイングイベントを行っています。実物大の3Dモデルや教材を用いて、最新の宇宙開発事情をお届けします。
      </Typography>
      <Typography>
        最新の打ち上げ情報については、下記のリンクをご覧ください。
      </Typography>
      <Typography variant="p" sx={{ mr: 3 }}>
        <Link href="/mission" sx={iconWrapStyle}>
          <SearchIcon sx={{ mr: 0.5 }} />
          ミッション検索
        </Link>
      </Typography>
      <Typography variant="p" sx={{ mr: 3 }}>
        <Link href="/meetup" sx={iconWrapStyle}>
          <SearchIcon sx={{ mr: 0.5 }} />
          集会検索
        </Link>
      </Typography>
      <Typography variant="h5" sx={{ mt: 3 }}>
        外部リンク
      </Typography>
      <Typography>
        告知・スケジュール・打ち上げ情報の確認等にご利用ください
      </Typography>
      <Typography variant="p" sx={{ mr: 3 }}>
        <Link href="https://twitter.com/vr_launch" sx={iconWrapStyle} external>
          <TwitterIcon sx={{ mr: 0.5 }} />
          Twitter
        </Link>
      </Typography>
      <Typography variant="p" sx={{ mr: 3 }}>
        <Link href="https://t.co/nL12021X0s" sx={iconWrapStyle} external>
          <EventIcon sx={{ mr: 0.5 }} />
          Googleカレンダー
        </Link>
      </Typography>
      <Typography variant="p" sx={{ mr: 3 }}>
        <Link href="https://t.co/cjfnxjZrZG" sx={iconWrapStyle} external>
          <ForumIcon sx={{ mr: 0.5 }} />
          Discord
        </Link>
      </Typography>
      <Typography variant="h5" sx={{ mt: 3 }}>
        ご連絡先
      </Typography>
      <Typography>
        ご意見・ご要望等ございましたら、下記のGoogle Form
        までお問い合わせください。
      </Typography>
      <Typography variant="p" sx={{ mr: 3 }}>
        <Link href="/meetup" sx={iconWrapStyle} external>
          <NoteAltOutlinedIcon sx={{ mr: 0.5 }} />
          参加者アンケート
        </Link>
      </Typography>
      <Typography variant="p" sx={{ mr: 3 }}>
        <Link href="https://t.co/nL12021X0s" sx={iconWrapStyle} external>
          <NoteAltOutlinedIcon sx={{ mr: 0.5 }} />
          スタッフ参加希望フォーム
        </Link>
      </Typography>
    </Box>
  );
};

export default App;

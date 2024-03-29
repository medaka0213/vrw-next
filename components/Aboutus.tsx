import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import ForumIcon from "@mui/icons-material/Forum";
import EventIcon from "@mui/icons-material/Event";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

import { Link } from "@/components/Link";

const iconWrapStyle = {
  display: "inline-flex",
  VerticalAlign: "text-bottom",
  BoxSizing: "inherit",
  textAlign: "center",
  AlignItems: "center",
};

const App = ({ sx = {} }) => {
  return (
    <Box
      sx={{
        display: "block",
        p: 3,
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
      <Box sx={{ display: "flex", mt: 1 }}>
        <Typography sx={{ mr: 3 }}>
          <Link href="/mission" sx={iconWrapStyle}>
            <SearchIcon sx={{ mr: 0.5 }} />
            ミッション検索
          </Link>
        </Typography>
        <Typography sx={{ mr: 3 }}>
          <Link href="/meetup" sx={iconWrapStyle}>
            <SearchIcon sx={{ mr: 0.5 }} />
            集会検索
          </Link>
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ mt: 3 }}>
        外部リンク
      </Typography>
      <Typography>
        告知・スケジュール・打ち上げ情報の確認等にご利用ください
      </Typography>
      <Box sx={{ display: "flex", mt: 1 }}>
        <Typography sx={{ mr: 3 }}>
          <Link
            href="https://twitter.com/vr_launch"
            sx={iconWrapStyle}
            external
          >
            <TwitterIcon sx={{ mr: 0.5 }} />
            Twitter
          </Link>
        </Typography>
        <Typography sx={{ mr: 3 }}>
          <Link
            href="https://calendar.google.com/calendar/u/0/embed?src=inoopdemi6k2uss2lktrfl0iu8@group.calendar.google.com"
            sx={iconWrapStyle}
            external
          >
            <EventIcon sx={{ mr: 0.5 }} />
            Googleカレンダー
          </Link>
        </Typography>
        <Typography sx={{ mr: 3 }}>
          <Link
            href="https://discord.com/invite/SBeSSY4xC9"
            sx={iconWrapStyle}
            external
          >
            <ForumIcon sx={{ mr: 0.5 }} />
            Discord
          </Link>
        </Typography>
        <Typography sx={{ mr: 3 }}>
          <Link
            href="https://misskey.virtualrocketwatching.net/"
            sx={iconWrapStyle}
            external
          >
            <ForumIcon sx={{ mr: 0.5 }} />
            Misskey
          </Link>
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ mt: 3 }}>
        ご連絡先
      </Typography>
      <Typography>
        ご意見・ご要望等ございましたら、下記のGoogle Form
        までお問い合わせください。
      </Typography>
      <Box sx={{ display: "flex", mt: 1 }}>
        <Typography sx={{ mr: 3 }}>
          <Link href="/form/perticipant" sx={iconWrapStyle}>
            <NoteAltOutlinedIcon sx={{ mr: 0.5 }} />
            参加者アンケート
          </Link>
        </Typography>
        <Typography sx={{ mr: 3 }}>
          <Link href="/form/staff" sx={iconWrapStyle}>
            <NoteAltOutlinedIcon sx={{ mr: 0.5 }} />
            スタッフ参加希望フォーム
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default App;

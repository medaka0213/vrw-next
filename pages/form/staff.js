import OgpHead from "@/components/OgpHead";
import MainBox from "@/components/common/MainBox";
import { Typography } from "@mui/material";
import { Link } from "@/components/Link";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

const iconWrapStyle = {
  display: "inline-flex",
  VerticalAlign: "text-bottom",
  BoxSizing: "inherit",
  textAlign: "center",
  AlignItems: "center",
};

const App = ({ sx = {} }) => {
  return (
    <>
      <OgpHead title="スタッフ参加希望フォーム"></OgpHead>
      <MainBox>
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          <Link
            href="https://forms.gle/fAKSm927ji59iU1w5"
            sx={iconWrapStyle}
            external
          >
            <NoteAltOutlinedIcon sx={{ mr: 0.5 }} />
            フォームが表示されない場合こちら
          </Link>
        </Typography>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeA5e7jdzyvLZD9-fs01ixzUJjJhcZKN65pjGSYj46nYYDEPw/viewform?embedded=true"
          width="100%"
          height="2000px"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          読み込んでいます…
        </iframe>
      </MainBox>
    </>
  );
};
export default App;

import MainBox from "../components/common/MainBox";
import Aboutus from "../components/Aboutus";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <>
      <MainBox>
        <Logo
          sx={{
            m: 3,
            mx: "auto",
            maxWidth: "600px",
          }}
        />
      </MainBox>
      <MainBox>
        <Aboutus />
      </MainBox>
    </>
  );
}

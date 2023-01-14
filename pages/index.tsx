import MainBox from "../components/common/MainBox";
import Aboutus from "../components/Aboutus";
import Logo from "../components/Logo";

import OgpHead from "@/components/OgpHead";

export default function Home() {
  return (
    <>
      <OgpHead />
      <MainBox>
        <Logo
          sx={{
            p: 3,
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

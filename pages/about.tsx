import MainBox from "../components/common/MainBox";
import Aboutus from "../components/Aboutus";
import OgpHead from "@/components/OgpHead";

export default function Home() {
  return (
    <>
      <OgpHead title="「ロケみる集会」について" />
      <MainBox>
        <Aboutus />
      </MainBox>
    </>
  );
}

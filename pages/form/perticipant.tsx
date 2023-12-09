import OgpHead from "@/components/OgpHead";
import MainBox from "@/components/common/MainBox";
import GoogleForm from "@/components/GoogleForm";

const App = () => {
  return (
    <>
      <OgpHead title="参加者アンケート"></OgpHead>
      <MainBox>
        <GoogleForm url="https://docs.google.com/forms/d/e/1FAIpQLScESvA557taE0zYj8gzlx2cQwrUDWs3cPxDnCWlacfUWTVLwg/viewform?embedded=true" />
      </MainBox>
    </>
  );
};
export default App;

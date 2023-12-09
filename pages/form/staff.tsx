import OgpHead from "@/components/OgpHead";
import MainBox from "@/components/common/MainBox";
import GoogleForm from "@/components/GoogleForm";

const App = () => {
  return (
    <>
      <OgpHead title="スタッフ参加希望フォーム"></OgpHead>
      <MainBox>
        <GoogleForm url="https://docs.google.com/forms/d/e/1FAIpQLSeA5e7jdzyvLZD9-fs01ixzUJjJhcZKN65pjGSYj46nYYDEPw/viewform?embedded=true" />
      </MainBox>
    </>
  );
};
export default App;

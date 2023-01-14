import React from "react";
import OgpHead from "@/components/OgpHead";
import Error404 from "@/components/Error404";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <OgpHead title="404 - Page Not Found" />
      <Error404 />
    </>
  );
};

export default App;

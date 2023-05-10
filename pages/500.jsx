import React from "react";
import OgpHead from "@/components/OgpHead";
import Error500 from "@/components/Error500";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <OgpHead title="500 - Internal Server Error" />
      <Error500 />
    </>
  );
};

export default App;

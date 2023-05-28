import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import { store as makeStore } from "react-vrw";

import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import "../styles/globals.css";

import { ResponsiveLayout } from "../components/Layout";
import { Analytics } from "@vercel/analytics/react";

const clientSideEmotionCache = createEmotionCache();

function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveLayout loading={loading}>
          <Analytics />
          <Component {...pageProps} />
        </ResponsiveLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

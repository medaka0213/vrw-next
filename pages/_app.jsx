import Head from "next/head";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import { createWrapper } from "next-redux-wrapper";
import { store as makeStore } from "react-vrw";

import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import "../styles/globals.css";

import {ResponsiveLayout} from "../components/Layout";
import OgpHead from "../components/OgpHead";

const clientSideEmotionCache = createEmotionCache();
const wrapper = createWrapper(makeStore, { debug: true });

function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <OgpHead />
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <ResponsiveLayout>
          <Component {...pageProps} />
        </ResponsiveLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(App);

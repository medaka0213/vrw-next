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

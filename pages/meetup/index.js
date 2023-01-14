import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MeeutpList from "@/components/MeeutpList";
import MainBox from "@/components/common/MainBox";

import {
  GET_ITEMS,
  SearchDetailForm,
  TimeRange,
  ParamToQueryItem,
  SEARCH_ITEMS,
  DEFAULT_QUERY,
} from "react-vrw";

const getParams = (type, query, keys) => {
  if (Object.keys(query).length === 0) {
    return DEFAULT_QUERY[type]
      ? DEFAULT_QUERY[type]()
      : [
          {
            key: "limit",
            value: 100,
          },
        ];
  } else {
    return Object.keys(query).map((k) => {
      const target = keys.filter((key) => key.value === k);
      console.log("target", target);
      return {
        key: k,
        value: query[k],
        type: target.length ? target[0].type : "string",
      };
    });
  }
};

const getKeys = (config, type) => {
  return (
    SEARCH_ITEMS[type] ||
    (config.search_keys &&
      config.search_keys.map((k) => {
        return {
          value: k,
          type:
            k === "datetime" || k.includes("created") || k.includes("updated")
              ? "datetime"
              : "string",
        };
      }))
  );
};

const App = () => {
  const router = useRouter();
  const { query = {} } = router;
  const type = "meetup";

  const itemReducer = useSelector((s) => s.itemReducer[type]);
  const { isReceived, Items, config = {} } = itemReducer || Object.create(null);
  const dispatch = useDispatch();
  const [params, setParams] = React.useState([]);
  const [queries, setQueries] = React.useState([]);
  const [keys, setKeys] = React.useState(getKeys(config, type));

  const loadItems = (params) => {
    dispatch(GET_ITEMS({ type, params }));
  };

  const movePage = (params) => {
    params = params.map((p) => `${p.key}=${p.value}`);
    const path = `/${type}/?${params.join("&")}`;
    Router.push(path);
  };

  useEffect(() => {
    if (!router.isReady) return;

    let keys = getKeys(config, type);
    const params = getParams(type, query, keys);
    const queries = params.map((p) => {
      let pld = {};
      if (p.key === "datetime" && p.value.includes("...")) {
        pld = TimeRange.fromMode(
          p.value.split("...")[0],
          "BETWEEN",
          p.value.split("...")[1]
        );
        pld = {
          key: "datetime",
          value0: pld.start,
          value1: pld.end,
          mode: pld.mode,
          type: "datetime",
        };
      } else {
        pld = ParamToQueryItem(`${p.key}=${p.value}`);
      }
      return {
        ...pld,
        enabled: true,
      };
    });

    setParams(params);
    setQueries(queries);
    setKeys(keys);
    loadItems(params);
  }, [dispatch, query]);

  return (
    <>
      <Head>
        <title>{isReceived ? `集会を検索する` : "loading..."}</title>
      </Head>
      <MainBox>
        <SearchDetailForm
          onSubmit={(params) => {
            movePage(
              params.map((p) => {
                return {
                  key: p.split("=")[0],
                  value: p.split("=")[1],
                };
              })
            );
          }}
          keys={keys}
          queries={queries}
        />
        <Typography variant="caption">
          注意: 日本語未対応です。英名・国際標準時で検索してください。
        </Typography>
      </MainBox>
      <MainBox>
        <MeeutpList items={Items || []} />
      </MainBox>
    </>
  );
};

export default App;

import React, { useEffect } from "react";
import Router from "next/router";

import Typography from "@mui/material/Typography";

import MeeutpList from "@/components/MeeutpList";
import MainBox from "@/components/common/MainBox";
import OgpHead from "@/components/OgpHead";

import { fetGetItems } from "@/lib/client";

import {
  SearchDetailForm,
  TimeRange,
  ParamToQueryItem,
  SEARCH_ITEMS,
  DEFAULT_QUERY,
  getDefaultQuery,
  ParseItemList,
  getSearchItems,
} from "react-vrw";

export const getServerSideProps = async (param) => {
  let { query } = param;
  let type = "meetup";
  if (Object.keys(query).length === 0) {
    query = {};
    getDefaultQuery(type).forEach(({ key, value }) => {
      query[key] = value;
    });
  }
  const res = await fetGetItems({ type, params: query });
  return {
    props: {
      type,
      query,
      Items: res.map((r) => r.data()),
    },
  };
};

const isDatetime = (key, type) => {
  const keyList = getSearchItems(type) || [];
  const target = keyList.filter((k) => k.value === key);
  return target.length ? target[0].type === "datetime" : false;
};

const getParams = (type, query, keys) => {
  if (Object.keys(query).length === 0) {
    return DEFAULT_QUERY[type]
      ? DEFAULT_QUERY[type]()
      : [
          {
            key: "limit",
            value: 1000,
          },
        ];
  } else {
    return Object.keys(query).map((k) => {
      const target = keys.filter((key) => key.value === k);
      return {
        key: k,
        value: query[k],
        type: target.length ? target[0].type : "string",
      };
    });
  }
};

const App = ({ query, Items, type }) => {
  const [queries, setQueries] = React.useState([]);
  let keys = getSearchItems(type);

  const movePage = (params) => {
    params = params.map((p) => `${p.key}=${p.value}`);
    const path = `/${type}/?${params.join("&")}`;
    Router.push(path);
  };

  useEffect(() => {
    const params = getParams(type, query, keys);
    const queries = params.map((p) => {
      let pld = {};
      if (isDatetime(p.key, type)) {
        pld = TimeRange.fromString(p.value).toQueryItem(p.key);
      } else {
        pld = ParamToQueryItem(`${p.key}=${p.value}`);
      }
      return {
        ...pld,
        enabled: true,
      };
    });
    setQueries(queries);
  }, [query]);

  return (
    <>
      <OgpHead title="集会を検索する"></OgpHead>
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
        <MeeutpList items={ParseItemList(Items) || []} />
      </MainBox>
    </>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import MissionList from "@/components/MissionList";
import MainBox from "@/components/common/MainBox";
import OgpHead from "@/components/OgpHead";

import { fetGetItems } from "@/lib/client";

import {
  SearchDetailForm,
  TimeRange,
  ParamToQueryItem,
  getSearchItems,
  getDefaultQuery,
} from "react-vrw";

const fetchProps = async (query) => {
  let type = "mission";
  if (Object.keys(query).length === 0) {
    query = {};
    getDefaultQuery(type).forEach(({ key, value }) => {
      query[key] = value;
    });
  }
  return await fetGetItems({ type, params: query });
};

const isDatetime = (key, type) => {
  const keyList = getSearchItems(type);
  const target = keyList.filter((k) => k.value === key);
  return target.length ? target[0].type === "datetime" : false;
};

const getParams = (type, query, keys) => {
  if (Object.keys(query).length === 0) {
    return getDefaultQuery(type);
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

const App = () => {
  const { query } = useRouter();
  const type = "mission";

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [queries, setQueries] = React.useState([]);
  let keys = getSearchItems(type);

  const movePage = (params) => {
    params = params.map((p) => `${p.key}=${p.value}`);
    const path = `/${type}/?${params.join("&")}`;
    Router.push(path);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoaded(false);
      const res = await fetchProps(query);
      console.log("result", res);
      setItems(res);
      setIsLoaded(true);
    }
    fetchData();
  }, [query]);

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
      <OgpHead title="ミッションを検索する"></OgpHead>
      <MainBox
        sx={{
          border: "1px solid #eaeaea",
          borderRadius: "4px",
          backgroundColor: "background.paper",
        }}
      >
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
      {isLoaded ? (
        <MainBox>
          <MissionList items={items || []} />
        </MainBox>
      ) : (
        <LinearProgress />
      )}
    </>
  );
};

export default App;

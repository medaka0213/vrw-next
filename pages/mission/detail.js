import { useRouter } from "next/router";
import Error404 from "@/components/Error404";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LinearProgress from "@mui/material/LinearProgress";

import {
  ItemReducer,
  GET_SINGLE_ITEM,
  GET_REFERENCE,
  GET_RELATION,
} from "react-vrw";

import MissionPage from "@/components/MissionPage";
import OgpHead from "@/components/OgpHead";

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pk = "" } = router.query;
  const type = pk.split("_")[0];

  const itemReducer =
    useSelector((s) => s.itemReducer[type]) || new ItemReducer();
  let isReceived =
    itemReducer.isReceived &&
    itemReducer.isReferenceReceived &&
    itemReducer.isRelationReceived;
  let { Item } = itemReducer;
  console.log("Item", Item);

  const load = () => {
    if (pk) {
      dispatch(GET_SINGLE_ITEM({ pk, type }));
      dispatch(GET_REFERENCE({ pk, type }));
      dispatch(GET_RELATION({ pk, type }));
    }
  };

  useEffect(() => {
    load();
  }, [pk]);

  return (
    <>
      <OgpHead title="ミッションの詳細情報">
        <title>
          {isReceived && Item.pk ? Item.get_jp_value("name") : "loading..."}
        </title>
      </OgpHead>
      {!isReceived && <LinearProgress />}
      {isReceived && (Item.pk ? <MissionPage type={type} /> : <Error404 />)}
    </>
  );
};

export default App;

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LinearProgress from "@mui/material/LinearProgress";

import {
  ItemReducer,
  GET_SINGLE_ITEM,
  GET_REFERENCE,
  GET_RELATION,
} from "react-vrw";

import MeetupPage from "@/components/MeetupPage";
import OgpHead from "@/components/OgpHead";

const App = () => {
  const type = "meetup";
  const dispatch = useDispatch();
  const router = useRouter();
  const { pk } = router.query;

  const itemReducer =
    useSelector((s) => s.itemReducer[type]) || new ItemReducer();
  const { Item = {} } = itemReducer;
  const isReceived =
    itemReducer.isReceived &&
    itemReducer.isReferenceReceived &&
    itemReducer.isRelationReceived;

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
        <title>{isReceived ? Item.get_jp_value("title") : "loading..."}</title>
      </OgpHead>
      {!isReceived && <LinearProgress />}
      {isReceived && <MeetupPage type={type} />}
    </>
  );
};

export default App;

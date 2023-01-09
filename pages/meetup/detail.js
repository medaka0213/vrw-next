import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemReducer,
  GET_SINGLE_ITEM,
  GET_REFERENCE,
  GET_RELATION,
} from "react-vrw";

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

  return JSON.stringify(Item);
};

export default App;

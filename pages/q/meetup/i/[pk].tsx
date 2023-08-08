import React from "react";

import MeetupPage from "@/components/MeetupPage";
import Error404 from "@/components/Error404";

import { MeetupDetail } from "@/lib/models";
import {
  fetGetSingleItem,
  fetGetRelation,
  fetGetReference,
} from "@/lib/client";
import OgpHead from "@/components/OgpHead";

const App = (props: any) => {
  console.log("App", props);
  let data = new MeetupDetail(props);
  return props.notFound ? (
    <Error404 />
  ) : (
    <>
      <OgpHead
        title={"集会情報 : " + data.title()}
        thumbnailUrl={data.thumbnail(false)}
      />
      <MeetupPage data={data} />
    </>
  );
};

App.getInitialProps = async (context: any) => {
  const { query } = context;

  const type = query.pk.split("_")[0];
  // アイテム
  const item = await fetGetSingleItem({ pk: query.pk, type });
  if (!item) {
    return { notFound: true };
  }
  // 関連アイテム
  const relation = await fetGetRelation({ pk: query.pk, type });
  const image = relation.image || [];
  // 参照アイテム
  const reference = await fetGetReference({ pk: query.pk, type });
  const launch = reference.launch ? reference.launch[0] : null;
  const event = reference.event ? reference.event[0] : null;
  return {
    item: item.data(),
    mission: launch ? launch.data() : event ? event.data() : null,
    poster: image?.map((item: any) => item.data()) || [],
    loaded: true,
  };
};

export default App;

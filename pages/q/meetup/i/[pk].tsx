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
  let data = new MeetupDetail(props);
  return props.notFound ? (
    <Error404 />
  ) : (
    <>
      <OgpHead
        title={"集会情報 : " + data.title()}
        thumbnailUrl={data.thumbnail({ includePoster: false })}
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
  let launch = relation.launch ? relation.launch[0] : null;
  let event = relation.event ? relation.event[0] : null;
  let slide = relation.slide ? relation.slide[0] : null;
  // 参照アイテム
  const reference = await fetGetReference({ pk: query.pk, type });
  if (!launch && !event) {
    // 関連アイテムがない場合は参照アイテムを参照する
    launch = reference.launch ? reference.launch[0] : null;
    event = reference.event ? reference.event[0] : null;
  }
  return {
    item: item.data(),
    mission: launch ? launch.data() : event ? event.data() : null,
    poster: image?.map((item: any) => item.data()) || [],
    slide: slide ? slide.data() : null,
    loaded: true,
  };
};

export default App;

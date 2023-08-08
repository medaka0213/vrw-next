import React from "react";

import MissionPage from "@/components/MissionPage";
import Error404 from "@/components/Error404";

import OgpHead from "@/components/OgpHead";
import { MissionDetail } from "@/lib/models";
import {
  fetGetSingleItem,
  fetGetRelation,
  fetGetReference,
} from "@/lib/client";

const App = (props: any = {}) => {
  console.log("App", props);
  let data = new MissionDetail(props);
  return props.notFound ? (
    <Error404 />
  ) : (
    <>
      <OgpHead
        title={"ミッション情報 : " + data.title()}
        thumbnailUrl={data.thumbnail()}
      />
      <MissionPage data={data} />
    </>
  );
};

App.getInitialProps = async (context: any) => {
  console.log("getInitialProps", context);
  const { query } = context;

  const type = query.pk.split("_")[0];
  if (["mission", "launch", "event"].indexOf(type) < 0) {
    return { notFound: true };
  }
  // アイテム
  const item = await fetGetSingleItem({ pk: query.pk, type });
  if (!item) {
    return { notFound: true };
  }
  // 関連アイテム
  const relation = await fetGetRelation({ pk: query.pk, type });
  const rocket = relation.rocket ? relation.rocket[0] : null;
  const slide = relation.slide ? relation.slide[0] : null;
  const meetup = relation.meetup || [];
  // 参照アイテム
  const reference = await fetGetReference({ pk: query.pk, type });
  const countdown = reference.countdown ? reference.countdown[0] : null;
  return {
    item: item.data(),
    rocket: rocket ? rocket.data() : null,
    slide: slide ? slide.data() : null,
    meetup: meetup?.map((item: any) => item.data()) || [],
    countdown: countdown ? countdown.data() : null,
  };
};

export default App;

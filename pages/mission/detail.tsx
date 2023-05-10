import { InferGetServerSidePropsType } from "next";
import React from "react";

import MissionPage from "@/components/MissionPage";
import OgpHead from "@/components/OgpHead";
import { MissionDetail } from "@/lib/models";
import { fetGetSingleItem, fetGetRelation, fetGetReference } from "@/lib/client";

export const getServerSideProps = async (param: any) => {
  const type = param.query.pk.split("_")[0];
  // アイテム
  const item = await fetGetSingleItem({ pk: param.query.pk, type });
  if (!item) {
    return { notFound: true };
  }
  // 関連アイテム
  const relation = await fetGetRelation({ pk: param.query.pk, type });
  const rocket = relation.rocket ? relation.rocket[0] : null;
  const slide = relation.slide ? relation.slide[0] : null;
  const meetup = relation.meetup || [];
  // 参照アイテム
  const reference = await fetGetReference({ pk: param.query.pk, type });
  const countdown = reference.countdown ? reference.countdown[0] : null;
  return {
    props: {
      item: item.data(),
      rocket: rocket ? rocket.data() : null,
      slide: slide ? slide.data() : null,
      meetup: meetup?.map((item: any) => item.data()) || [],
      countdown: countdown ? countdown.data() : null
    }
  };
};

const App = (_data: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  let data = new MissionDetail(_data);
  return (
    <>
      <OgpHead
        title={data.item.get_jp_value("name")}
        thumbnailUrl={data.thumbnail()}
      />
      <MissionPage data={data} />
    </>
  );
};

export default App;

import { InferGetServerSidePropsType } from "next";
import React from "react";

import MeetupPage from "@/components/MeetupPage";

import { MeetupDetail } from "@/lib/models";
import { fetGetSingleItem, fetGetRelation, fetGetReference } from "@/lib/client";
import OgpHead from "@/components/OgpHead";

export const getServerSideProps = async (param: any) => {
  const type = param.query.pk.split("_")[0];
  // アイテム
  const item = await fetGetSingleItem({ pk: param.query.pk, type });
  if (!item) {
    return { notFound: true };
  }
  // 関連アイテム
  const relation = await fetGetRelation({ pk: param.query.pk, type });
  const image = relation.image || [];
  // 参照アイテム
  const reference = await fetGetReference({ pk: param.query.pk, type });
  const launch = reference.launch ? reference.launch[0] : null;
  const event = reference.event ? reference.event[0] : null;
  return {
    props: {
      item: item.data(),
      mission: launch ? launch.data() : event ? event.data() : null,
      poster: image?.map((item: any) => item.data()) || []
    }
  };
};

const App = (_data: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  let data = new MeetupDetail(_data);
  return (
    <>
      <OgpHead title={data.item.get_jp_value("title")} />
      <MeetupPage data={data} />
    </>
  );
};

export default App;

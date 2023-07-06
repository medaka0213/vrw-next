import { InferGetServerSidePropsType } from "next";
import React from "react";

import MeetupPage from "@/components/MeetupPage";
import LinearProgress from "@mui/material/LinearProgress";

import { MeetupDetail } from "@/lib/models";
import {
  fetGetSingleItem,
  fetGetRelation,
  fetGetReference,
} from "@/lib/client";
import OgpHead from "@/components/OgpHead";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps = async (context: any) => {
  const { params } = context;

  const type = params.pk.split("_")[0];
  // アイテム
  const item = await fetGetSingleItem({ pk: params.pk, type });
  if (!item) {
    return { notFound: true };
  }
  // 関連アイテム
  const relation = await fetGetRelation({ pk: params.pk, type });
  const image = relation.image || [];
  // 参照アイテム
  const reference = await fetGetReference({ pk: params.pk, type });
  const launch = reference.launch ? reference.launch[0] : null;
  const event = reference.event ? reference.event[0] : null;
  return {
    props: {
      item: item.data(),
      mission: launch ? launch.data() : event ? event.data() : null,
      poster: image?.map((item: any) => item.data()) || [],
      loaded: true,
    },
    revalidate: 600,
  };
};

const App = (_data: InferGetServerSidePropsType<typeof getStaticProps>) => {
  let data = new MeetupDetail(_data);
  return _data.loaded ? (
    <>
      <OgpHead
        title={"集会情報 : " + data.title()}
        thumbnailUrl={data.thumbnail(false)}
      />
      <MeetupPage data={data} />
    </>
  ) : (
    <LinearProgress />
  );
};

export default App;

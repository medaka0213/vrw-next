import { InferGetServerSidePropsType } from "next";
import React from "react";

import MissionPage from "@/components/MissionPage";
import LinearProgress from "@mui/material/LinearProgress";

import OgpHead from "@/components/OgpHead";
import { MissionDetail } from "@/lib/models";
import {
  fetGetSingleItem,
  fetGetRelation,
  fetGetReference,
} from "@/lib/client";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps = async (context: any) => {
  const { params } = context;

  const type = params.pk.split("_")[0];
  if (["mission", "launch", "event"].indexOf(type) < 0) {
    return { notFound: true };
  }
  // アイテム
  const item = await fetGetSingleItem({ pk: params.pk, type });
  if (!item) {
    return { notFound: true };
  }
  // 関連アイテム
  const relation = await fetGetRelation({ pk: params.pk, type });
  const rocket = relation.rocket ? relation.rocket[0] : null;
  const slide = relation.slide ? relation.slide[0] : null;
  const meetup = relation.meetup || [];
  // 参照アイテム
  const reference = await fetGetReference({ pk: params.pk, type });
  const countdown = reference.countdown ? reference.countdown[0] : null;
  return {
    props: {
      item: item.data(),
      rocket: rocket ? rocket.data() : null,
      slide: slide ? slide.data() : null,
      meetup: meetup?.map((item: any) => item.data()) || [],
      countdown: countdown ? countdown.data() : null,
      loaded: true,
    },
    revalidate: 600,
  };
};

const App = (_data: InferGetServerSidePropsType<typeof getStaticProps>) => {
  let data = new MissionDetail(_data);
  return _data.loaded ? (
    <>
      <OgpHead
        title={"ミッション情報 : " + data.title()}
        thumbnailUrl={data.thumbnail()}
      />
      <MissionPage data={data} />
    </>
  ) : (
    <LinearProgress />
  );
};

export default App;

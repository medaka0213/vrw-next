import { InferGetServerSidePropsType } from "next";
import React from "react";

export const getServerSideProps = async (param: any) => {
  return { redirect: { destination: "/q/meetup/i/" + param.query.pk } };
};

const App = (_data: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>redirecting...</div>;
};

export default App;

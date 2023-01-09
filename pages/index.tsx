import Head from "next/head";
import Image from "next/image";

import Aboutus from "../components/Aboutus";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <>
      <Logo sx={{ m: 3 }} />
      <Aboutus sx={{ my: 3 }} />
    </>
  );
}

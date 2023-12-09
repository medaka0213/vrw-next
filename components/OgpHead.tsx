import Head from "next/head";

const OgpHead = ({
  title = "ロケット打ち上げを観る集会 - Virtual Rocket Watching",
  thumbnailUrl = "https://img.virtualrocketwatching.net/image/image_3636fb8c-5931-4993-82c9-1745ce031d0e.jpeg",
  description = "「ロケみる集会」ホームページ",
  card = "summary",
  children = null,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      ></link>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={thumbnailUrl} />
      <meta property="og:description" content={description} />
      <meta property="twitter:card" content={card} />
      <meta property="twitter:creator" content="@vr_launch" />
      {children}
    </Head>
  );
};

export default OgpHead;

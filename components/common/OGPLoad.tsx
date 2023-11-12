import React from "react";

import { OGPDisplay } from "@medaka0213/react-vrw";
import { PubClient, Ogp } from "@/lib/client";

const App = ({
  url,
  image_height = "200",
}: {
  url: string;
  image_height: string;
}) => {
  const req = new PubClient();
  const [ogp, setOgp] = React.useState<Ogp | null>(null);

  React.useEffect(() => {
    (async () => {
      const res = await req.getOgp({ url });
      setOgp(res);
    })();
  }, []);

  return (
    <OGPDisplay
      title={ogp?.title || url}
      description={ogp?.description}
      image={ogp?.image}
      url={url}
      image_height={image_height}
    />
  );
};

export default App;

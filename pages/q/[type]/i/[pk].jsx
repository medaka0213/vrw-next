import { useRouter } from "next/router";
import React, { useEffect } from "react";


const Page = () => {
  const router = useRouter();
  let { type, pk } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    if (!type || !pk) return;

    if (type ==="launch" || type === "event") {
      type = "mission"
    }
    router.push(`/${type}/detail/?pk=${pk}`)
  }, [router]);

  return <div>Redirecting...</div>;
}

export default Page;

import {
  ApiClient,
  DataApiClient,
  DataApiClientV2,
  TimeRange,
  ParseItemList,
  sort_array,
  ParseItemByTypes,
  ParseItem,
} from "@medaka0213/react-vrw";

interface ParamItem {
  key: string;
  value: number | string;
}

const API_KEY = process.env.API_KEY || "API_KEY";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_V2_BASE_URL = process.env.API_V2_BASE_URL;
const GPT_BASE_URL = process.env.GPT_BASE_URL;

class ServerSideDataApiClient extends DataApiClient {
  constructor() {
    super({
      apiKey: API_KEY,
      baseURL: API_BASE_URL,
    });
  }
}

class ServerSideDataApiClientV2 extends DataApiClientV2 {
  constructor() {
    super({
      apiKey: API_KEY,
      baseURL: API_V2_BASE_URL,
    });
  }
}

export const fetGetItems = async ({
  type,
  paramList = [],
  params = {},
}: {
  type: string;
  paramList?: ParamItem[];
  params?: any;
}) => {
  // "mission" | "meetup" | "launch" | "events" でなければV2
  let req;
  let res: any[];
  paramList.forEach((p) => (params[p.key] = p.value));
  if (["mission", "meetup", "launch", "events"].includes(type)) {
    req = new ServerSideDataApiClient();
    res = await req.listItem({ type, params });
    console.log("fetGetItems", res);
    return ParseItemList(res || []);
  } else {
    req = new ServerSideDataApiClientV2();
    res = await req.listItem({ type, params });
    console.log("fetGetItems", res);
    return res
  }
};

export const fetGetSingleItem = async ({
  type,
  pk,
}: {
  type: string;
  pk: string;
}) => {
  let req = new ServerSideDataApiClient();
  let res = await req.getItem({ type, pk });
  return res ? ParseItem(res) : null;
};

export const fetGetRelation = async ({
  type,
  pk,
}: {
  type: string;
  pk: string;
}) => {
  let req = new ServerSideDataApiClient();
  let res = await req.getRelation({ type, pk });
  return ParseItemByTypes(res || []);
};

export const fetGetReference = async ({
  type,
  pk,
}: {
  type: string;
  pk: string;
}) => {
  let req = new ServerSideDataApiClient();
  let res = await req.getReference({ type, pk });
  return ParseItemByTypes(res);
};

const getDatetimeRange = (dt: any = new Date()) => {
  const start = new Date();
  const end = new Date();
  start.setDate(start.getDate() - 14);
  end.setDate(end.getDate() + 7);
  const queryValue = TimeRange.fromMode(
    start.toISOString(),
    "BETWEEN",
    end.toISOString()
  )
    .toString("datetime")
    .replace("datetime=", "");
  return {
    key: "datetime",
    value: queryValue,
  };
};

export const getMissions = async (dt: any = new Date()) => {
  const paramList = [
    getDatetimeRange(dt),
    {
      key: "datetime_date_type",
      value: "CONFIRMED",
    },
  ];
  return await fetGetItems({ type: "mission", paramList });
};

export const getMeetup = async (dt: any = new Date()) => {
  const paramList = [getDatetimeRange(dt)];
  return await fetGetItems({ type: "meetup", paramList });
};

export const getEvents = async (dt: any = new Date()) => {
  const missions = await getMissions(dt);
  const meetups = await getMeetup(dt);

  return sort_array([...missions, ...meetups], ["datetime"]);
};

export type Ogp = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export class ChatGptApiClient extends ApiClient {
  constructor() {
    super({
      apiKey: API_KEY,
      baseURL: GPT_BASE_URL || API_BASE_URL,
    });
  }
  async getOgp({ url }: { url: string }): Promise<Ogp> {
    const res = await this.callApiJson("/whisper/ogp?url=" + encodeURI(url), {
      method: "GET",
    });
    console.log("getOgp", res);
    return res;
  }
}

export const getOgp = async ({ url }: { url: string }): Promise<Ogp> => {
  const req = new ChatGptApiClient();
  const res = await req.getOgp({ url });
  return res;
}

export class PubClient extends ApiClient {
  constructor() {
    super({
      apiKey: "",
      baseURL: "/api",
    });
  }

  async getItems({
    type,
    paramList = [],
    params = {},
  }: {
    type: string;
    paramList?: ParamItem[];
    params?: any;
  }) {
    paramList.forEach((p) => (params[p.key] = p.value));
    const res = await this.callApiJson(`/q/${type}`, { method: "GET" });
    return ParseItemList(res).reverse();
  }

  async getOgp({ url }: { url: string }): Promise<Ogp> {
    const res = await this.callApiJson("/ogp", {
      method: "POST",
      body: { url },
    });
    return res;
  }
}

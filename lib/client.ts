import {
  ApiClient, DataApiClient, TimeRange, ParseItemList, sort_array,
  ParseItemByTypes, ParseItem
} from "react-vrw";

interface ParamItem {
  key: string;
  value: number | string;
}

const API_KEY = process.env.API_KEY || "API_KEY";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ADMIN_API_BASE_URL = process.env.ADMIN_API_BASE_URL;

class ServerSideDataApiClient extends DataApiClient {
  constructor() {
    super({
      apiKey: API_KEY,
      baseURL: API_BASE_URL,
    });
  }
}

export class AdminClient extends DataApiClient {
  constructor() {
    super({
      apiKey: "",
      baseURL: ADMIN_API_BASE_URL
    });
  }
}

export const fetGetItems = async ({ type, paramList = [], params = {} }: { type: string, paramList?: ParamItem[]; params?: any }) => {
  let req = new ServerSideDataApiClient();
  paramList.forEach(p => params[p.key] = p.value)
  let res: any[] = await req.listItem({ type, params });
  console.log("fetGetItems", res)
  return ParseItemList(res || []);
};

export const fetAdminGetItems = async ({ type, paramList = [], params = {} }: { type: string, paramList?: ParamItem[]; params?: any }) => {
  let req = new AdminClient();
  paramList.forEach(p => params[p.key] = p.value)
  let res: any[] = await req.listItem({ type, params });
  console.log("fetAdminGetItems", res)
  return ParseItemList(res || []);
};

export const fetGetSingleItem = async ({ type, pk }: { type: string, pk: string }) => {
  let req = new ServerSideDataApiClient();
  let res = await req.getItem({ type, pk });
  return res ? ParseItem(res) : null;
};

export const fetGetRelation = async ({ type, pk }: { type: string, pk: string }) => {
  let req = new ServerSideDataApiClient();
  let res = await req.getRelation({ type, pk });
  return ParseItemByTypes(res || []);
}

export const fetGetReference = async ({ type, pk }: { type: string, pk: string }) => {
  let req = new ServerSideDataApiClient();
  let res = await req.getReference({ type, pk });
  return ParseItemByTypes(res);
}

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


export class PubClient extends ApiClient {
  constructor() {
    super({
      apiKey: "",
      baseURL: "/api"
    });
  }

  async getItems({ type }: { type: "mission" | "meetup" | "launch" | "events" }) {
    const res = await this.callApiJson(`/q/${type}`, { method: "GET" });
    return ParseItemList(res).reverse();
  }
}


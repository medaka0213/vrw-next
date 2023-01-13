import { api, TimeRange, ParseItemList, sort_array } from "react-vrw";

interface ParamItem {
  key: string;
  value: number | string;
}

export const fetGetItems = async (type: string, params: ParamItem[]) => {
  let res = await api.get(
    `/q/${type}/?${(params || []).map((p) => `${p.key}=${p.value}`).join("&")}`
  );
  return ParseItemList(res.payload?.Items || []).reverse();
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
  const params = [
    getDatetimeRange(dt),
    {
      key: "datetime_date_type",
      value: "CONFIRMED",
    },
  ];
  return await fetGetItems("mission", params);
};

export const getMeetup = async (dt: any = new Date()) => {
  const params = [getDatetimeRange(dt)];
  return await fetGetItems("meetup", params);
};

export const getEvents = async (dt: any = new Date()) => {
  const missions = await getMissions(dt);
  const meetups = await getMeetup(dt);

  return sort_array([...missions, ...meetups], ["datetime"]).reverse();
};

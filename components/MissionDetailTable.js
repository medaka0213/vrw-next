import DetailTable from "./DetailTable";
import { Link, CountDownClock, TimeRange } from "react-vrw";
import { getColor } from "../lib/item";

const App = ({ item, sx, meetup }) => {
  console.log("item", item);
  const items_launch = [
    {
      key: "状態",
      value: getColor(item).jp + " (" + getColor(item).en.toUpperCase() + ")",
      sx: {
        color: getColor(item).color,
      },
    },
    {
      key: "カウントダウン",
      value:
        item.datetime_time_type === "CONFIRMED" ? (
          <CountDownClock datetime_iso={item.datetime} />
        ) : (
          "打ち上げ時刻が確定していません"
        ),
    },
    {
      key: "日時",
      value: item.datetime_format_JP,
    },
    {
      key: "ミッション概要",
      value: item.get_jp_value("overview"),
    },
    {
      key: "ロケット",
      value: (
        <Link
          href={{
            pathname: "/mission",
            query: {
              rocket: item.rocket,
              limit: 1000,
            },
          }}
        >
          {item.get_jp_value("rocket")}
        </Link>
      ),
    },
    {
      key: "打ち上げ事業者",
      value: (
        <Link
          href={{
            pathname: "/mission",
            query: {
              provider: item.provider,
              limit: 1000,
            },
          }}
        >
          {item.get_jp_value("provider")}
        </Link>
      ),
    },
    {
      key: "発射場",
      value: (
        <Link
          href={{
            pathname: "/mission",
            query: {
              site: item.site,
              limit: 1000,
            },
          }}
        >
          {item.get_jp_value("site")}
        </Link>
      ),
    },
    {
      key: "関連リンク",
      value: (
        <Link href={item.nextSpaceFlightLink()} external>
          nextspaceflight.com
        </Link>
      ),
    },
    {
      key: "集会情報",
      value: meetup.map((meetup) => (
        <>
          <Link
            href={{
              pathname: "/meetup/detail",
              query: {
                pk: meetup?.pk,
              },
            }}
          >
            {meetup.type.toUpperCase()}: {meetup.datetime_format()}
          </Link>
          <br />
        </>
      )),
    },
    {
      key: "もっと調べる",
      value: (
        <>
          <Link
            href={`/mission?datetime=${TimeRange.fromMode(item.datetime, "YEAR")
              .toString()
              .replace("datetime=", "")}&limit=1000`}
          >
            {item.datetime.split("-")[0]}年
          </Link>
          のミッション一覧
        </>
      ),
    },
  ];
  const items_event = [
    {
      key: "状態",
      value: getColor(item).jp + " (" + getColor(item).en.toUpperCase() + ")",
      sx: {
        color: getColor(item).color,
      },
    },
    {
      key: "カウントダウン",
      value:
        item.datetime_time_type === "CONFIRMED" ? (
          <CountDownClock datetime_iso={item.datetime} />
        ) : (
          "打ち上げ時刻が確定していません"
        ),
    },
    {
      key: "日時",
      value: item.datetime_format_JP,
    },
    {
      key: "関連リンク",
      value: (
        <Link href={item.nextSpaceFlightLink()} external>
          nextspaceflight.com
        </Link>
      ),
    },
    {
      key: "集会情報",
      value: meetup.map((meetup) => (
        <>
          <Link
            href={{
              pathname: "/meetup/detail",
              query: {
                pk: meetup?.pk,
              },
            }}
          >
            {meetup.type.toUpperCase()}: {meetup.datetime_format()}
          </Link>
          <br />
        </>
      )),
    },
    {
      key: "もっと調べる",
      value: (
        <>
          <Link
            href={`/mission?datetime=${TimeRange.fromMode(item.datetime, "YEAR")
              .toString()
              .replace("datetime=", "")}&limit=1000`}
          >
            {item.datetime.split("-")[0]}年
          </Link>
          のミッション一覧
        </>
      ),
    },
  ];

  return (
    <DetailTable
      items={item.itemType() === "launch" ? items_launch : items_event}
      sx={sx}
    />
  );
};
export default App;

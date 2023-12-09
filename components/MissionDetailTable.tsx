import React from "react";
import dynamic from "next/dynamic";
import SearchIcon from "@mui/icons-material/Search";

import { TimeRange } from "@medaka0213/react-vrw";
import { Launch, Event, Meetup } from "@medaka0213/react-vrw";

import { Link } from "@/components/Link";
import { getColor } from "@/lib/item";
import DetailTable from "./DetailTable";

const CountDownClock = dynamic(
  () =>
    import("@medaka0213/react-vrw").then(
      (mod: any): React.FC<{ datetime_iso: string }> => mod.CountDownClock
    ),
  { ssr: false }
);

const App = ({
  item,
  sx,
  meetup,
}: {
  item: Launch | Event;
  sx?: any;
  meetup: Meetup[];
}) => {
  const items_launch = ({ item }: { item: Launch }) => [
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
          <SearchIcon
            sx={{
              fontSize: "0.8rem",
              ml: 0.25,
              mt: 0.5,
              transform: "scale(-1, 1)",
            }}
          />
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
          <SearchIcon
            sx={{
              fontSize: "0.8rem",
              ml: 0.25,
              mt: 0.5,
              transform: "scale(-1, 1)",
            }}
          />
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
          <SearchIcon
            sx={{
              fontSize: "0.8rem",
              ml: 0.25,
              mt: 0.5,
              transform: "scale(-1, 1)",
            }}
          />
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
            <SearchIcon
              sx={{
                fontSize: "0.8rem",
                ml: 0.25,
                mt: 0.5,
                transform: "scale(-1, 1)",
              }}
            />
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
            <SearchIcon
              sx={{
                fontSize: "0.8rem",
                ml: 0.25,
                mt: 0.5,
                transform: "scale(-1, 1)",
              }}
            />
          </Link>
          のミッション一覧
        </>
      ),
    },
  ];
  const items_event = ({ item }: { item: Event }) => [
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
      value: meetup.map((meetup: any) => (
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
      items={
        item.itemType() === "launch"
          ? items_launch({ item: item as Launch })
          : items_event({ item })
      }
      sx={sx}
    />
  );
};
export default App;

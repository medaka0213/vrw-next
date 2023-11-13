import moment from "moment-timezone";
import "moment/locale/ja";


export const timeRangeForWeekly = (meetup_start: string): {
  start: string,
  end: string
} => {
  var _dt = moment(meetup_start + "Z").locale("en").subtract(7, "days");
  var start = moment(_dt).startOf("week");
  start.add(1, "days");
  start.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
  var end = moment(_dt).endOf("week");
  end.add(2, "days");
  end.set({ hour: 15, minute: 0, second: 0, millisecond: 0 });
  return {
    start: start.format("YYYY-MM-DDTHH:mm:ss"),
    end: end.format("YYYY-MM-DDTHH:mm:ss"),
  };
};

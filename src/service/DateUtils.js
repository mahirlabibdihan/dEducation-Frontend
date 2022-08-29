import { format } from "date-fns";
export const getTime = (hours, minutes = 0, seconds = 0) => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    hours,
    minutes
  );
};

export const getTimeStamp = (timestamp) => {
  const curr_date = new Date();
  const curr_year = curr_date.getFullYear();
  const curr_month = curr_date.getMonth();
  const curr_day = curr_date.getDate();
  const curr_hour = curr_date.getHours();
  const curr_minutes = curr_date.getMinutes();

  const date = new Date(timestamp.slice(0, -1));
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  if (curr_year === year) {
    if (curr_month === month) {
      if (curr_day === day) {
        if (curr_hour === hour) {
          if (curr_minutes === minutes) {
            return "Just now";
          } else {
            return curr_minutes - minutes + "m";
          }
        } else {
          return curr_hour - hour + "h";
        }
      } else {
        return curr_day - day + "d";
      }
    } else {
      return format(date, "MMM d");
    }
  } else {
    return format(date, "MMM d, yyyy");
  }
};

// format(new Date(timestamp), "eee, MMM d, yyyy") +
//       " at " +
//       format(new Date(timestamp), "hh:mm a")

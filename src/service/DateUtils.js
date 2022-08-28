export const getTime = (hours, minutes = 0, seconds = 0) => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    hours,
    minutes
  );
};

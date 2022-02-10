export const objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

export const isDateToday = (date: string) => {
  return date === new Intl.DateTimeFormat(["en-GB"]).format(new Date());
};

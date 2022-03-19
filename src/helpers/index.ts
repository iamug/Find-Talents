export const capitalizeFirstLetter = (str: string) =>
  str.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

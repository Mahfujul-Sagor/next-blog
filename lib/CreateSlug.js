import slugify from "slugify";

const slugifyOptions = {
  replacement: '-',
  remove: /[*+~.()'"!:@]/g,
  lower: true,
  strict: true,
};

export const createSlug = (str) => {
  return slugify(str, slugifyOptions);
};
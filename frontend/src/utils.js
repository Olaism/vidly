import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export function filterItemByGenre(items, value) {
  if (value.toLowerCase() === "all") {
    return items;
  }
  return items.filter((item) => item["genre"]["name"] === value);
}

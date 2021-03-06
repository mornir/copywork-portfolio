export default {
  allCW: `*[_type == "copywork"] | order(date desc) {
  _id,
  "slug": "/" + slug.current,
  title,
  color,
  date,
  "imageUrl": logo.asset->url
}`,
  oneCW: `*[_type == "copywork" && slug.current == $slug]{
  title,
  color,
  codepen,
  copiedURL,
  video
}[0]`,
  generate: `*[_type == "copywork"]{
  "slug": "/" + slug.current,
  title,
  color,
  codepen,
  copiedURL,
  video
}`,
  allSlugs: `*[_type == "copywork"].slug.current`,
}

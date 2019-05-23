import url from 'url'

export default function(req, res, next) {
  let queryData = url.parse(req.url, true).query

  // console.log('Query:', queryData.preview)

  if (queryData.preview === true) {
    res.spa = true
  }

  //const paths = ['/', '/a']

  /* if (paths.includes(req.originalUrl)) {
    // Will trigger the "traditional SPA mode"
    res.spa = true
  }*/
  // Don't forget to call next in all cases!
  // Otherwise, your app will be stuck forever :|
  next()
}

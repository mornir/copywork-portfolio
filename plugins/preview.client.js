export default async function({ query, enablePreview }) {
  if (!query.preview) return
  console.log('preview!')
  enablePreview({
    codepen: 'xyMPYj',
    color: '#32a852',
    copiedURL: 'https://nuxtjs.org/blog/going-full-static/',
    title: 'Draft Content',
    video:
      'https://res.cloudinary.com/infonuagique/video/upload/v1543310621/copywork/LogRocket/logrocket-pricing-page',
  })
}

export default async function({ query, enablePreview }) {
  if (!query.preview) return
  console.log('preview!')
  enablePreview({
    codepen: 'ZEQpNoL',
    color: '#4287f5',
    copiedURL: 'https://nuxtjs.org/',
    title: 'Preview Content',
    video:
      'https://res.cloudinary.com/infonuagique/video/upload/v1543310621/copywork/LogRocket/logrocket-pricing-page',
  })
}

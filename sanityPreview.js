require('dotenv').config()

import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: false,
  withCredentials: true,
})

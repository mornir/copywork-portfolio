const sanity = require('@sanity/client')
const exportDataset = require('@sanity/export')
const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const FOLDER_ID = process.env.FOLDER_ID
const DATASET = process.env.DATASET

const sanityClient = sanity({
  projectId: process.env.PROJECT_ID,
  dataset: DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function backup() {
  await exportDataset({
    // Instance of @sanity/client configured to correct project ID and dataset
    client: sanityClient,

    // Name of dataset to export
    dataset: DATASET,

    // Path to write zip-file to
    outputPath: path.join('/tmp', `${DATASET}.tar.gz`),

    // Whether or not to export assets. Note that this operation is currently slightly lossy;
    // metadata stored on the asset document itself (original filename, for instance) might be lost
    // Default: `true`
    assets: false,

    // Exports documents only, without downloading or rewriting asset references
    // Default: `false`
    raw: true,

    // Whether or not to export drafts
    // Default: `true`
    drafts: false,
  })

  const client = await google.auth.getClient({
    credentials: JSON.parse(process.env.CREDENTIALS),
    scopes: 'https://www.googleapis.com/auth/drive.file',
  })

  const drive = google.drive({
    version: 'v3',
    auth: client,
  })

  await drive.files.create({
    requestBody: {
      name: `${DATASET}.tar.gz`,
      mimeType: 'application/gzip',
      parents: [FOLDER_ID],
    },
    media: {
      mimeType: 'application/gzip',
      body: fs.createReadStream(path.join('/tmp', `${DATASET}.tar.gz`)),
    },
  })

  // Delete oldest if more than 5 files

  // 1. Get list of backup files inside folder with specified id
  const res = await drive.files.list({
    fields: 'files(id, parents, createdTime)',
    q: `'${FOLDER_ID}' in parents`,
    orderBy: 'createdTime',
  })

  // Keep max. 5 backups
  if (res.data.files.length > 5) {
    // Delete oldest backup
    return drive.files.delete({ fileId: res.data.files[0].id })
  }
}

exports.handler = function(event, context, callback) {
  backup()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Backup completed successfully!',
      })
    })
    .catch(e => {
      callback(e)
    })
}

# Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/eeec1609-923c-4ac8-9822-a4661b2c8953/deploy-status)](https://app.netlify.com/sites/copywork/deploys)
[![GitHub Actions](https://img.shields.io/github/workflow/status/mornir/copywork-portfolio/End-to-end%20tests?label=build&logo=github&style=for-the-badge)](https://github.com/mornir/copywork-portfolio/actions)
[![Cypress Dashboard](https://img.shields.io/badge/cypress-dashboard-blue?style=for-the-badge)](https://dashboard.cypress.io/projects/cr62do/runs)

**To see the backend -->** https://github.com/mornir/copywork-cms

This portfolio is a collection of all the websites I reproduced the design using the amazing CSS utility framework [Tailwind](https://tailwindcss.com/docs/what-is-tailwind/).

I built this website with Nuxt.js using its [static mode](https://nuxtjs.org/guide/#static-generated-pre-rendering-). Naturally I used Tailwind for the styling. I also made use of CSS variables to dynamically change the header and footer colors (you can learn more about it [in my blog post](https://dev.to/mornir/css-variables-are-great-1k4l)).

The website is PWA enabled: it can be used offline and behaves like a native app on smartphones.

For storing the data, I use an extremely flexible and customisable CMS called [Sanity](https://www.sanity.io/), which provides a powerful [GraphQL-like syntax](https://groq.dev/) to query only the needed data.

## Environment variables

A `.env` file is needed with two variables from a [Sanity project](https://www.sanity.io/pricing). See `.env.example` file.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# generate static project
$ yarn run generate
```

## Testing

Testing is done with Cypress.

```bash
# serve with hot reload at localhost:3000
$ yarn dev

# in another terminal
$ yarn test
```

# Cypress tests template repo

## A) Run in the cloud using GitHub Actions

- **Run Cypress tests** workflow from _Actions_ tab

## B) Run locally on your machine

### Setup

- Install Node.js
- Install Cypress or Docker
- Clone the repo
- Create a `.env` file using `.env.example` as a template
- Create Personal Access Token (classic) with scope `read:packages` and set it as `GITHUB_TOKEN` environment variable

### Run locally using Cypress

- Run `npm test`

### Run locally using Docker

- Run `npm run tests-in-docker`

More details are also available in [Wopee.io integration with Cypress](https://docs.wopee.io/integrations/cypress/01-getting-started/) documentation.

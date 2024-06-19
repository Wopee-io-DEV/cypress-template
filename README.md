# Cypress tests template repo

## A) Run in the cloud using GitHub Actions

- __Run Cypress tests__ workflow from _Actions_ tab

## B) Run locally on your machine

### Setup
- Install Node.js
- Install Cypress or Docker
- Clone the repo
- Create a `.env` file using `.env.example` as a template
- Create Personal Access Token (classic) with scope `read:packages` and set it as `GITHUB_TOKEN` environment variable


### Run locally using Cypress
- Run `npm run tests`

### Run locally using Docker
- Run `npm run tests-in-docker`
# Wopee.io Cypress tests

Cypress project with Wopee.io visual testing set up. The sample test `cypress/e2e/wopee.cy.ts` opens your app, waits until fonts and images are loaded and sends a full-page screenshot to Wopee.io. Wopee.io compares it with the approved baseline and shows the result in Commander. Start from this test and add your own pages and flows.

## Run in GitHub Actions

Open **Actions › Run Cypress tests › Run workflow**. Nothing to set up: the repository already has the `WOPEE_API_KEY` secret, and `.github/workflows/.env` has your project's API URL, project UUID and App URL.

## Run locally

Needs Node.js 18 or newer.

```shell
git clone <this repository>
cd <repository folder>
cp .env.example .env
```

Open `.env` and paste an API key after `WOPEE_API_KEY=`. Create one in Commander under **More › Settings › API Keys** (it is shown only once). The other values are already filled in for your project. If you cloned the public template instead, replace `put-your-project-uuid-here` with your project UUID (same page as the API keys) and `https://dronjo.wopee.io/` with the URL of your app.

```shell
npm ci
npm test
```

`.env` is in `.gitignore`. Never commit your API key.

## Review in Commander

Open your project in [Commander](https://cmd.wopee.io) › **Runs**. Every run is its own suite, `Cypress sample <date time>`. The first run has no baseline, so its steps are **New**: approve them to make them the baseline. Later runs are compared with it: approve a change you expect, reject a bug. Visual differences do not fail the Cypress test.

## Make it yours

- **App URL**: the test opens `WOPEE_PROJECT_URL` (the App URL you entered when creating the project). Change it in `.env` and `.github/workflows/.env`.
- **Add a check**: after an interaction, track another step:
  ```ts
  cy.contains("a", "Pricing").click();
  cy.pageReady();
  cy.wopeeTrack({ stepName: "Pricing page" });
  ```
  `cy.pageReady()` (in `cypress/support/commands.ts`) waits for fonts and images so the screenshot shows the finished page.
- **Examples**: `cypress/e2e-examples/` has more examples (login flow, several scenarios, viewports). They are not part of `npm test`. Run one with `npx cypress run --config specPattern=cypress/e2e-examples/02-dronjo-simple.spec.cy.ts`.

## Add Wopee.io to an existing Cypress project

Follow [Install the Cypress plugin](https://docs.wopee.io/cypress/03-install-plugin/). This repository is a working reference for the three files involved: `cypress.config.ts`, `cypress/support/commands.ts` and `cypress/e2e/wopee.cy.ts`.

## Troubleshooting

- **`Error: [{ "code": "invalid_type", ... "received": "null" }]` or `Wopee SDK configuration is invalid`**: a value in `.env` is missing, or the API key usually belongs to another Wopee.io instance. Create the key in the Commander you run against. `WOPEE_API_URL` is only for self-hosted instances; leave it out for cmd.wopee.io (the default is `https://api.wopee.io`).
- **`Class extends value undefined is not a constructor`**: Cypress 15 or newer. The plugin supports Cypress 13 and 14; keep the version in `package.json`.
- **`bad option: --no-sandbox` when started from a VS Code terminal**: run `env -u ELECTRON_RUN_AS_NODE npm test`.

# Cypress + Wopee.io

This repository is your project's Cypress test suite with Wopee.io visual testing already wired in.
Wopee.io created it when you created the project in [Commander](https://cmd.wopee.io), and filled in your project settings.
The sample test `cypress/e2e/simple.spec.cy.ts` opens your app's URL, waits for its fonts and images, and takes one screenshot that Wopee.io compares with an approved baseline.
Run it as it is first, then grow it into your own tests.

## Run from Commander

Nothing to set up. In Commander open **Runs** › **Start testing**. Commander runs this repository's tests in GitHub Actions with your project settings (the API key is the repository's `WOPEE_API_KEY` secret) and shows the results under Runs.

Want the tests on every push or pull request? Add your own trigger to `.github/workflows/tests.yml`.

## Run locally

Needs git and Node.js 22 or 24 (the versions Cypress 16 supports).

```shell
git clone <this repository>
cd <repository folder>
cp .env.example .env
```

Open `.env` and paste an API key after `WOPEE_API_KEY=`. Create one in Commander › More › Settings › API Keys (the key is shown only once).
The other values are already your project's. Keep `.env` out of git; it is in `.gitignore`.

```shell
npm ci
npm test
```

The first `npm ci` also downloads the Cypress app. The console prints a `Tracking response` line for each tracked step with its status and a link to it in Commander.

## Review in Commander

Open Commander › Runs and the suite "First tests for your project w. Wopee.io <date time>".

- First run: the step `Home page` has status **new**. Check the screenshot and **Approve** it; it becomes the baseline.
- Next runs: the step is **ok** when the page looks the same, or **unresolved** when it differs. Open it to see the difference, then Approve (new baseline) or Reject.

A visual difference is reported in Commander; it does not fail the Cypress test.

## Make it yours

- **Your app:** `baseUrl` in `cypress.config.ts` is `WOPEE_PROJECT_URL` (the App URL you entered in Commander), so `cy.visit("/")` opens your app. Change it in `.env` for local runs; for runs from Commander, change the App URL in Commander.
- **Add a check:** after any interaction, one line tracks another screenshot:

  ```ts
  cy.wopeeTrack({ stepName: "Contact page" });
  ```

  Every `stepName` in a test gets its own baseline. On a newly loaded page, put the font and image wait from the sample before it.

- **More tests:** add `*.spec.cy.ts` files under `cypress/e2e/`. `cypress/e2e/simple.spec.cy.ts` shows what every test needs: start a suite and a scenario, track, stop the scenario.
- **Examples:** `cypress/e2e-examples/` shows multi-step flows on the Wopee.io demo app and element checks with `cy.get(...).wopeeTrack(...)`. It is not part of the default run; to try an example, copy the file into `cypress/e2e/`.
- **Cypress version:** the template uses Cypress 16. `@wopee-io/wopee.cy` 4.13.1 and newer works with Cypress 13 to 16.

## Add Wopee.io to an existing Cypress project

Follow [Cypress getting started](https://docs.wopee.io/cypress/01-getting-started/) in the Wopee.io docs.

## Troubleshooting

- **`Wopee SDK configuration is invalid — cannot initialize`**: `.env` is missing or a value is empty. Run `cp .env.example .env` and paste the API key.
- **`ZodError ... Expected object, received null`** or an authorization error: the API key usually belongs to another Wopee.io instance (or another project). Create the key in the Commander you run against. `WOPEE_API_URL` is only for self-hosted instances; leave it out for cmd.wopee.io (the default is `https://api.wopee.io`).
- **`Cannot find module .../Cypress.app/.../app/index.js`** in a VS Code terminal: VS Code sets `ELECTRON_RUN_AS_NODE`. Run `env -u ELECTRON_RUN_AS_NODE npm test`, or use another terminal.
- **A local run is unresolved against a baseline from Commander:** expected; your screen scale and fonts differ from Commander's runner. Keep the baseline from one place (usually Commander) and do not approve local screenshots over it.
- **`put-your-project-uuid-here` in `.env`**: you cloned the public template, not your project's repository. Put in your project UUID from Commander › More › Settings › API Keys (`WOPEE_PROJECT_UUID`) and your app's URL (`WOPEE_PROJECT_URL`).

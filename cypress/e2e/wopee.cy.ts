/// <reference types="cypress" />
/// <reference types="@wopee-io/wopee.cy" />

const pad = (n: number) => String(n).padStart(2, "0");
const now = new Date();
const suiteName = `Cypress sample ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

describe(suiteName, () => {
  before(() => cy.wopeeStartSuite(suiteName));
  beforeEach(() => cy.wopeeStartScenario(Cypress.currentTest.title));
  afterEach(() => cy.wopeeStopScenario());

  it("Home page", () => {
    // baseUrl is your App URL (WOPEE_PROJECT_URL in .env)
    cy.visit("/");
    cy.pageReady();
    cy.wopeeTrack({ stepName: "Home page" });

    // Add a check after an interaction:
    // cy.contains("a", "Contact").click();
    // cy.pageReady();
    // cy.wopeeTrack({ stepName: "Contact page" });
  });
});

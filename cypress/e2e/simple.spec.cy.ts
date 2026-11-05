/// <reference types="cypress" />
/// <reference types="@wopee-io/wopee.cy" />

const testSuiteName = "First tests for your project w. Wopee.io";

describe(testSuiteName, () => {
  before(() => {
    cy.wopeeStartSuite(`${testSuiteName} ${new Date().toLocaleString()}`);
  });

  beforeEach(() => {
    cy.wopeeStartScenario(Cypress.currentTest.title);
  });

  afterEach(() => {
    cy.wopeeStopScenario();
  });

  it("Home page works", () => {
    cy.visit("/");
    // Autonomous (low-code) assert: Wopee visual check. It waits for the page's fonts and images first.
    cy.wopeeTrack({ stepName: "Home page" });
  });
});

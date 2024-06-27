/// <reference types="cypress" />
/// <reference types="@wopee-io/wopee.cy" />

const dronjoBaseUrl = "https://dronjo.wopee.io/";
const testSuiteName = "Dronjo Example: Simple test";

describe(testSuiteName, () => {
  before(() => {
    cy.wopeeStartSuite(testSuiteName);
  });

  beforeEach(() => {
    cy.wopeeStartScenario(Cypress.currentTest.title);
  });

  afterEach(() => {
    cy.wopeeStopScenario();
  });

  it("User is able to login", () => {
    cy.visit(dronjoBaseUrl);
    cy.get("#sign_in").click();

    cy.get('input[name="user"]').type("marcel.veselka@tesena.com");
    cy.get('input[name="password"]').type("admin"); // in real life, use environment variables

    cy.get("button").contains("sign in").click();

    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "User is logged in" });
  });
});

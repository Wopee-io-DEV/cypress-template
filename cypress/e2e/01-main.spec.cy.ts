/// <reference types="cypress" />
/// <reference types="@wopee-io/wopee.cy" />

const testSuiteName = "First tests for your project w. Wopee.io";

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

  it("Home page works", () => {
    cy.visit("/");
    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "Home page" });
  });

  it("Contact page works", () => {
    cy.visit("/");
    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "Home page" });
    // Click on the contact link
    cy.get("a").contains("Contact").click();
    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "Contact page" });
  });

  it("Login page works", () => {
    cy.visit("/");
    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "Home page" });
    // Click on the login link
    cy.get("a").contains("Login").click();
    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "Login page" });
  });
});

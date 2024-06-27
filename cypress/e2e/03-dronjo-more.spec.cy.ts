/// <reference types="cypress" />
/// <reference types="@wopee-io/wopee.cy" />

const dronjoBaseUrl = "https://dronjo.wopee.io/";
const testSuiteName = "Dronjo regression tests";

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
    cy.visit(dronjoBaseUrl);

    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "Navigation to gallery" });
  });

  it("Gallery page works", () => {
    cy.visit(dronjoBaseUrl);
    cy.get("#navbarNav a").contains("Gallery").click();

    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "Navigation to gallery" });
  });

  // Visual Validation after each step
  it("User is able to login - intense validation", () => {
    cy.visit(dronjoBaseUrl);
    cy.wopeeTrack({ stepName: "Home page loaded" });

    cy.get("#sign_in").click();
    cy.wopeeTrack({ stepName: "Navigation to the login page" });

    cy.get('input[name="user"]').type("marcel.veselka@tesena.com");
    cy.get('input[name="password"]').type("admin");
    cy.wopeeTrack({ stepName: "User name and password filled in" });

    cy.get("button").contains("sign in").click();

    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "User is logged in" });
  });
});
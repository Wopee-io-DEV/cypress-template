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
    // Wait for web fonts and images, so the screenshot has text and pictures
    cy.document().then((doc) => {
      const loading: Promise<unknown>[] = [];
      doc.fonts.forEach((font) => loading.push(font.load().catch(() => {})));
      for (const img of Array.from(doc.images)) {
        loading.push(img.decode().catch(() => {}));
      }
      return Promise.all(loading);
    });
    // Autonomous (low-code) assert: Wopee visual check
    cy.wopeeTrack({ stepName: "Home page" });
  });
});

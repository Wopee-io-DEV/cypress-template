/// <reference types="cypress" />
/// <reference types='@wopee-io/wopee.cy' />

before(() => {
  cy.wopeeStartSuite('cy-suite-030424/3');
});

context('Wopee integration smoke', () => {
  beforeEach(() => {
    cy.visit('/commands/viewport');
  });

  afterEach(() => {
    cy.wopeeStopScenario();
  });

  it('Smoke 1', () => {
    cy.wopeeStartScenario('cy-smoke-1');
    cy.get('#navbar').should('be.visible');

    cy.wopeeTrack('Smoke 1 - Whole page - 1', { retryLimit: 1, comment: 'Hello, world!' }, (response) => {
      cy.task('log', response);
    });

    cy.get('#navbar').wopeeTrack('Smoke 1 - Separate element - 1', {
      ignoreAreas: [
        {
          x: 1,
          y: 1,
          width: 600,
          height: 50,
        },
      ],
    });

    cy.wopeeTrack('Smoke 1 - Whole page - With additional options - 1', {
      pixelToPixelDiffTolerance: 1,
      keepScreenshot: true,
      ignoreAreas: [
        {
          x: 0,
          y: 0,
          width: 300,
          height: 300,
        },
      ],
    });
  });

  it('Smoke 2', () => {
    cy.wopeeStartScenario('cy-smoke-2');
    cy.get('#navbar').should('be.visible');

    cy.wopeeTrack('Smoke 2 - Whole page - 1');

    cy.get('#navbar').wopeeTrack('Smoke 2 - Separate element - 1');

    cy.wopeeTrack('Smoke 2 - With additional options - 1', {
      pixelToPixelDiffTolerance: 2,
    });
  });

  it('Smoke 3', () => {
    cy.wopeeStartScenario('cy-smoke-3');
    cy.visit('/utilities');

    cy.get('body > div.container.content-container > div > div > div:nth-child(4) > div > ul > li:nth-child(1)')
      .wopeeTrack('Smoke 3 - Type: Before - 1')
      .click()
      .wopeeTrack('Smoke 3 - Type: After - 1');
  });
});
import { addWopeeCommands } from "@wopee-io/wopee.cy";

addWopeeCommands();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      pageReady(): Chainable<void>;
    }
  }
}

// Wait until web fonts and images are loaded, so the screenshot shows the finished page.
Cypress.Commands.add("pageReady", () => {
  cy.document().then((doc) =>
    Promise.all([
      ...Array.from(doc.fonts).map((font) => font.load()),
      ...Array.from(doc.images).map((img) => img.decode().catch(() => undefined)),
    ]),
  );
});

import "dotenv/config";
import { addWopeePlugin } from '@wopee-io/wopee.cy';
import { defineConfig } from 'cypress';

export default defineConfig({
  retries: 0,
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotOnRunFailure: false,
  env: {
    wopee: {
      apiUrl: process.env.WOPEE_API_URL,
      apiKey: process.env.WOPEE_API_KEY,
      projectUuid: process.env.WOPEE_PROJECT_UUID,
      // branchName: process.env.WOPEE_BRANCH_NAME,
      pixelToPixelDiffTolerance: process.env.WOPEE_PIXEL_TO_PIXEL_DIFF_TOLERANCE,
      enableSoftAssert: process.env.WOPEE_ENABLE_SOFT_ASSERT,
      // customTags: process.env.WOPEE_CUSTOM_TAGS,
      // ciBuildId: process.env.WOPEE_CI_BUILD_ID,
      // ignoreAreas: ['a', 'button'],
      // os: null,
      // device: null,
      // browser: null,
      // viewport: null,
      // comment: 'cypress-apollo-adapter',
    },
  },
  e2e: {
    baseUrl: 'https://example.cypress.io',
    setupNodeEvents(on, config) {
      addWopeePlugin(on, config);

      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});
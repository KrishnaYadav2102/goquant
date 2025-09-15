// playwright.staging.config.ts
import base from './playwright.config';
export default {
  ...base,
  use: {
    ...base.use,
    baseURL: 'https://staging.justtestit.org',
  },
};

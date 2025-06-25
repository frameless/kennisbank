import { getURL } from '../getURL';

export const strapiURL = `${getURL({
  env: process.env,
  key: 'KENNISBANK_API_URL',
  isOrigin: true,
})}/graphql`;

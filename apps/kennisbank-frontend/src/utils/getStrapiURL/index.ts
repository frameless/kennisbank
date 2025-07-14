import { getURL } from '../getURL';

export const getStrapiURL = () =>
  `${getURL({
    env: process.env,
    key: 'KENNISBANK_API_URL',
    isOrigin: true,
  })}/graphql`;

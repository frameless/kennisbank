'use server';

import { SEARCH_KENNISARTIKEL_BY_TITLE } from '@/queries/graphql';
import { fetchData, getStrapiURL } from '@/utils';

const getSearchKennisartikelData = async (value: string) => {
  const { data } = await fetchData<any>({
    url: getStrapiURL(),
    query: SEARCH_KENNISARTIKEL_BY_TITLE,
    variables: {
      query: value,
    },
    headers: {
      Authorization: `Bearer ${process.env.KENNISBANK_API_TOKEN}`,
    },
  });
  return data?.products;
};

export const onSearchBarChangeHandle = async (value: string) => {
  const products = await getSearchKennisartikelData(value);
  return products;
};

export const onSearchBarSubmit = async (value: string) => {
  const products = await getSearchKennisartikelData(value);
  return products[0];
};

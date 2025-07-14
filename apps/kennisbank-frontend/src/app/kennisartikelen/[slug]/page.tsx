import { notFound } from 'next/navigation';

import { GET_KENNISARTIKEL_BY_SLUG } from '@/queries/graphql';
import { KennisartikelQueryTypes } from '@/types';
import { fetchData, getStrapiURL } from '@/utils';
import { CategoryButtons } from '@/components';

interface KennisartikelPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const KennisartikelPage = async ({ params }: KennisartikelPageProps) => {
  const { slug } = await params;
  const { data } = await fetchData<KennisartikelQueryTypes>({
    url: getStrapiURL(),
    query: GET_KENNISARTIKEL_BY_SLUG,
    headers: {
      Authorization: `Bearer ${process.env.KENNISBANK_API_TOKEN}`,
    },
    variables: {
      slug,
    },
  });

  if (!data || data?.products?.length === 0) {
    notFound();
  }

  const product = data.products[0];
  return (
    <div
      style={{
        inlineSize: '800px',
        marginInline: 'auto',
        paddingBlock: '2rem',
      }}
    >
      <h1>{product?.title}</h1>
      <CategoryButtons sections={product?.sections ?? []} />
    </div>
  );
};
export default KennisartikelPage;

import { notFound } from 'next/navigation';

import { GET_KENNISARTIKEL_BY_SLUG } from '@/queries/graphql';
import { KennisartikelQueryTypes } from '@/types';
import { fetchData, getStrapiURL } from '@/utils';
import { Article, CategoryButtons, Heading, Page } from '@/components';

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
    <main>
      <Page>
        <Article>
          <Heading level={1}>{product?.title}</Heading>
          <CategoryButtons sections={product?.sections ?? []} />
        </Article>
      </Page>
    </main>
  );
};
export default KennisartikelPage;

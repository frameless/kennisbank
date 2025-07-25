import Link from 'next/link';

import { GET_ALL_KENNISARTIKELEN } from '@/queries/graphql';
import { fetchData, getStrapiURL } from '@/utils';
import { ProductsData } from '@/types';
import { Heading, Page, Paragraph } from '@/components';

export const dynamic = 'force-dynamic';

const KennisartikelenPage = async () => {
  const { data } = await fetchData<ProductsData>({
    url: getStrapiURL(),
    query: GET_ALL_KENNISARTIKELEN,
    headers: {
      Authorization: `Bearer ${process.env.KENNISBANK_API_TOKEN}`,
    },
  });

  const artikelen = data?.products || [];

  return (
    <main>
      <Page>
        <Heading level={1}>Alle Kennisartikelen</Heading>
        <section className="article-list">
          {artikelen.map((artikel, index) => (
            <article key={index} className="article-card">
              <Link href={`/kennisartikelen/${artikel.slug}`}>
                <div>
                  <Heading level={2}>{artikel.title}</Heading>
                  {artikel?.description && <Paragraph> {artikel.description}</Paragraph>}
                </div>
              </Link>
            </article>
          ))}
        </section>
      </Page>
    </main>
  );
};

export default KennisartikelenPage;

import Link from 'next/link';

import { GET_ALL_KENNISARTIKELEN } from '@/queries/graphql';
import { fetchData, getStrapiURL } from '@/utils';
import { ProductsData } from '@/types';

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
    <div>
      <main>
        <h1>Alle Kennisartikelen</h1>
        <section>
          {artikelen.map((artikel, index) => (
            <article key={index}>
              <Link href={`/kennisartikelen/${artikel.slug}`}>
                <h2>{artikel.title}</h2>
                {artikel?.description && <p> {artikel.description}</p>}
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default KennisartikelenPage;

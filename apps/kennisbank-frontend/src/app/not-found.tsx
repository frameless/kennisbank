import { GET_NOT_FOUND_PAGE } from '@/queries/graphql';
import { fetchData, getStrapiURL } from '@/utils';
import { Page, Heading, Markdown } from '@/components';
import { PageNotFoundResultType } from '@/types';

export const dynamic = 'force-dynamic';

const NotFoundPage = async () => {
  const { data } = await fetchData<PageNotFoundResultType>({
    url: getStrapiURL(),
    query: GET_NOT_FOUND_PAGE,
    headers: {
      Authorization: `Bearer ${process.env.KENNISBANK_API_TOKEN}`,
    },
  });

  const content = data?.notFoundPage;

  if (!content) {
    return (
      <main>
        <Heading level={1}>Pagina niet gevonden</Heading>
      </main>
    );
  }

  return (
    <main>
      <Page>
        <Heading level={1}>{content.titel}</Heading>
        <Markdown content={content.body} />
      </Page>
    </main>
  );
};

export default NotFoundPage;

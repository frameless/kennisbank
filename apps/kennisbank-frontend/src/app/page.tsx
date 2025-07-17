import { GET_HOME_PAGE } from '@/queries/graphql';
import { fetchData, getStrapiURL } from '@/utils';
import { HomePageRootType } from '@/types';
import { Heading, Page, Paragraph, Sections } from '@/components';

export const dynamic = 'force-dynamic';

const Home = async () => {
  const { data } = await fetchData<HomePageRootType>({
    url: getStrapiURL(),
    query: GET_HOME_PAGE,
    headers: {
      Authorization: `Bearer ${process.env.KENNISBANK_API_TOKEN}`,
    },
  });

  return (
    <main>
      <Page>
        <Heading level={1}>{data?.homePage?.title}</Heading>
        <Paragraph>{data.homePage.subtitle}</Paragraph>
        <Sections components={data.homePage.sections} />
      </Page>
    </main>
  );
};
export default Home;

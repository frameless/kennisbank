import { GET_HOME_PAGE } from '@/queries/graphql';
import { fetchData, getStrapiURL } from '@/utils';
import { HomePageRootType } from '@/types';
import { Heading, Paragraph, Sections } from '@/components';

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
      <Heading level={1}>{data?.homePage?.title}</Heading>
      <Paragraph>{data.homePage.subtitle}</Paragraph>
      <Sections components={data.homePage.sections} />
    </main>
  );
};
export default Home;

import { GET_HOME_PAGE } from '@/queries/graphql';
import { fetchData, strapiURL } from '@/utils';

// { data: { homePage: { title: 'Kennisbank Home Page' } } }

interface HomePageData {
  data: {
    homePage: {
      title: string;
    };
  };
}

const Home = async () => {
  const { data } = await fetchData<HomePageData>({
    url: strapiURL,
    query: GET_HOME_PAGE,
    headers: {
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      Authorization: `Bearer ${process.env.KENNISBANK_API_TOKEN}`,
    },
  });

  return (
    <div>
      <main>
        <h1>{data?.homePage?.title}</h1>
      </main>
    </div>
  );
};
export default Home;

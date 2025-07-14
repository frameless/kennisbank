const gql = (query: string) => query;

export const GET_HOME_PAGE = gql(`
query getHomePage {
  homePage {
    title
  }
}
`);

export const GET_KENNISARTIKEL_BY_SLUG = gql(`
  query getKennisartikelBySlug($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      title
      slug
      sections {
        ... on ComponentSharedContentBlock {
          component: __typename
          category
          content
        }
      }
    }
  }
`);
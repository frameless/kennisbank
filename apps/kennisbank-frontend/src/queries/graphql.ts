const gql = (query: string) => query;

export const GET_HOME_PAGE = gql(`
query getHomePage {
  homePage {
    title
    subtitle
    sections {
      ... on ComponentSharedCategory {
        component: __typename
        item {
          id
          categories
          description
          icons
        }
      }
      ... on ComponentSharedCallToAction {
        component: __typename
        id
        appearance
        textContent
        href
      }
    }
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

export const GET_ALL_KENNISARTIKELEN = gql(`
  query getAllProducts {
  products(pagination: { start: 0, limit: -1 }) {
    title
    description
    slug
  }
}`);
export const SEARCH_KENNISARTIKEL_BY_TITLE = gql(`
  query SearchKennisartikelByTitle($query: String!) {
  products(filters: { title: { contains: $query } }) {
    title
    slug
  }
}`);

const gql = (query: string) => query;

export const GET_HOME_PAGE = gql(`
query getHomePage {
  homePage {
    title
  }
}
`);

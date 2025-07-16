export type ComponentTypes = 'ComponentSharedContentBlock';
export type Category =
  | 'introduction'
  | 'application'
  | 'proof'
  | 'conditions'
  | 'objection'
  | 'costs'
  | 'term'
  | 'what_to_do_if_no_response'
  | 'details'
  | 'contact';
export interface SectionsTypes {
  component: ComponentTypes;
  category: Category;
  content: string;
}
export interface ProductsTypes {
  title: string;
  slug: string;
  sections: SectionsTypes[];
}

export interface KennisartikelDataTypes {
  products: ProductsTypes[];
}

export interface KennisartikelQueryTypes {
  data: KennisartikelDataTypes;
}

export interface ProductData {
  title: string;
  description: string;
  slug: string;
}
export interface ProductsData {
  data: {
    products: ProductData[];
  };
}
export interface HomePageRootType {
  data: HomePageData;
}

export interface HomePageData {
  homePage: HomePage;
}

export interface HomePage {
  title: string;
  subtitle: string;
  sections: HomePageSection[];
}

export type HomePageSection = ComponentSharedCategory | ComponentSharedCallToAction;

export interface ComponentSharedCategory {
  component: "ComponentSharedCategory";
  item: HomePageCategoryItem[];
}

export interface HomePageCategoryItem {
  id: string;
  categories: string;
  description: string;
  icons: string;
}

export interface ComponentSharedCallToAction {
  component: "ComponentSharedCallToAction";
  id: string;
  appearance: string;
  textContent: string;
  href: string;
}


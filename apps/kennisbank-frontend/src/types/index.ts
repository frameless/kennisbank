export type ComponentTypes = "ComponentSharedContentBlock"
export type Category = "introduction" | "application" | "proof" | "conditions" | "objection" | "costs" | "term" | "what_to_do_if_no_response" | "details" | "contact";
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
    data: KennisartikelDataTypes
}
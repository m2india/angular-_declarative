export interface IPost{
    id?: string;
    title: string;
    content: string;
    author: string;
    published_date: string;
    category_ref: string;
    categoryName?: string;
}
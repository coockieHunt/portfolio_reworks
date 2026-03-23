export interface ITag {
    id: number;
    name: string;
    slug: string;
    color: string;
}

export interface IBlogPost {
    author?: {
        id?: number;
        name?: string;
    };
    tags: ITag[];
    post: {
        id: number;
        featuredImage: string;
        authorId?: string | null;
        content: string;
        createdAt: string;
        editedAt: string;
        published: boolean;
        slug: string;
        summary: string;
        title: string;
        indexed: boolean;
    };
}
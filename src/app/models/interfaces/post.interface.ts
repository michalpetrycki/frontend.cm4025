export interface Post {
    _id?: string;
    authorId?: string;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// import { Entity } from 'src/app/models/entities/entity';
// import { PostResponse } from 'src/app/models/interfaces/post.response.interface';

// export class Post extends Entity {

//     public content: string;
//     public authorId: number;
//     public createdAt?: Date;
//     public updatedAt?: Date;

//     constructor(postResponse: PostResponse) {
//         super(postResponse.id);
//         this.content = postResponse.content;
//         this.authorId = postResponse.authorId;
//         this.createdAt = postResponse.createdAt;
//         this.updatedAt = postResponse.updatedAt;
//     }

// }

export interface Post {
    _id: string;
    authorId: string;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

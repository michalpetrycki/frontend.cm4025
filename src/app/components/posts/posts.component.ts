import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/entities/post';
import { NewPost } from 'src/app/models/interfaces/post.new.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  createPostGroup = new FormGroup({

    content: new FormControl('', [ Validators.required ]),
    
  });

  constructor(private postService: PostService) 
  {

    this.posts = [];

  }

  ngOnInit(): void {

    this.fetchPosts();

  }

  private async fetchPosts(): Promise<void> {

    this.posts = await this.postService.fetchPosts();

  }

  public createPost(): void {

    const postContent = this.createPostGroup.get('content')?.value;
    const newPost: NewPost = {
      title: 'Do I actually need a title here?',
      authorId: String(1),
      content: postContent
    };

    this.postService.createPost(newPost);

  }

  // Used for debugging - striginfies array elements returned by server.
  public displayPost(post: Post){
    return JSON.stringify(post);
  }

}

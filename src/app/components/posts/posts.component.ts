import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/entities/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {

  posts: Post[];

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

}

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { Entity, EntityType } from 'src/app/models/entities/entity';
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';
import { Post } from 'src/app/models/entities/post';
import { PostResponse } from 'src/app/models/interfaces/post.response.interface';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NewPost } from 'src/app/models/interfaces/post.new.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Entity[] = [];

  private postsEndpoint = '';
  
  constructor(private apiService: ApiService, private apiEndpointsService: ApiEndpointsService, 
    private toastService: ToastService) 
  { 

    this.postsEndpoint = this.apiEndpointsService.getPostsEndpoint();

  }


  async fetchPosts(): Promise<Post[]>{

    return new Promise<Post[]>(async (resolve, reject) => {

      this.apiService.get(this.postsEndpoint, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          if (response.ok && response.status === 200 && response.statusText === 'OK'){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const posts = responseArray[0].map((x: PostResponse) => new Post(x));
            
            resolve(posts);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async createPost(newPost: NewPost): Promise<Post> {

    return new Promise<Post>((resolve, reject) => {

      this.apiService.post(this.postsEndpoint, newPost, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          if (response.ok && response.status === 200 && response.statusText === 'OK'){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const posts = responseArray[0].map((x: PostResponse) => new Post(x));
            
            resolve(posts);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async updatePost(newPost: NewPost): Promise<Post> {

    return new Promise<Post>((resolve, reject) => {

      this.apiService.patch(this.postsEndpoint, newPost, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          if (response.ok && response.status === 200 && response.statusText === 'OK'){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const posts = responseArray[0].map((x: PostResponse) => new Post(x));
            
            resolve(posts);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

}

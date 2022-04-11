import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';
import { Post } from 'src/app/models/interfaces/post.interface';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = [];

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

          debugger;

          if (response.ok && response.status === 200 && response.statusText === 'OK'){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const posts = responseArray[0] as Post[];
            
            resolve(posts);
  
          }
          else {
            resolve([]);
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async createPost(newPost: Post): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.post(this.postsEndpoint, newPost, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 201 - new resource created
          if (response.ok && response.status === 201){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const newPost = responseArray[0] as Post;

            this.toastService.showSuccess('New post successfully created');
            
            resolve(newPost !== null && newPost !== undefined);
  
          }
          
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async updatePost(newPost: Post): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.patch(this.postsEndpoint, newPost, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 201 - resource updated
          if (response.ok && response.status === 201){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const newPost = responseArray[0] as Post;

            this.toastService.showSuccess('Post successfully edited');
            
            resolve(newPost !== null && newPost !== undefined);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async deletePost(post: Post): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.delete(this.postsEndpoint, { observe: 'response', body: { _id: post._id} })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 204 - existing resource successfully removed
          if (response.ok && response.status === 204){

            this.toastService.showSuccess('Post successfully deleted');
            
            resolve(true);
  
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

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { Entity, EntityType } from 'src/app/models/entities/entity';
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';
import { Post } from 'src/app/models/entities/post';
import { PostResponse } from 'src/app/models/interfaces/post.response.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Entity[] = [];

  private getPostsEndpoint = '';

  constructor(private apiService: ApiService, private apiEndpointsService: ApiEndpointsService) 
  { 

    this.getPostsEndpoint = this.apiEndpointsService.getAllPostsEndpoint();

  }


  async fetchPosts(): Promise<Post[]>{

    return new Promise<Post[]>(async (resolve, reject) => {

        this.apiService.get(this.getPostsEndpoint, { observe: 'response' })
        .subscribe((response: HttpResponse<object>) => {


            if (response.ok && response.status === 200 && response.statusText === 'OK'){

                const responseBody = response.body!;

                const values = Object.values(responseBody);
                const xxx = values[0].map((x: PostResponse) => new Post(x));
                const post = xxx[0];

                debugger;
    
                
    
                // if (posts && posts.length > 0){
                //     resolve(posts);
                // }
                // else{
                //     reject([]);
                // }
    
            }
        });
          
        // .subscribe((response: Post[]) => {

        //     const x = response['results'][0];


        //     // const x: Post = new Post(posts[0]);

        //     debugger;

        //     resolve([]);
        // });

    });

  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}

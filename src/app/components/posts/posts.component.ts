import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/entities/post';
import { NewPost } from 'src/app/models/interfaces/post.new.interface';
import { DateService } from 'src/app/services/date/date.service';
import { PostService } from 'src/app/services/post.service';
import { DateTime } from 'luxon';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PostsComponent implements OnInit {

  posts: Post[];
  showUpdateButton: boolean;
  createPostGroup: FormGroup;
  canDisplayEditArea: boolean[];
  canDisplayEditButton: boolean[];
  editForms: FormGroup[];

  constructor(private postService: PostService, private dateService: DateService, private spinnerService: SpinnerService) 
  {

    this.spinnerService.showSpinner();

    this.posts = [];
    this.showUpdateButton = false;
    this.createPostGroup = new FormGroup({

      content: new FormControl('', [ Validators.required ]),
      
    });

    this.canDisplayEditArea = [];
    this.canDisplayEditButton = [];

    this.editForms = [];

  }

  async ngOnInit(): Promise<void> {

    await this.fetchPosts();
    this.spinnerService.hideSpinner();

  }

  private async fetchPosts(): Promise<void> {

    return new Promise<void>(async (resolve) => {

      this.posts = await this.postService.fetchPosts();

      this.canDisplayEditArea = this.posts.map(s => false);
      this.canDisplayEditButton = this.posts.map(s => true);
      this.editForms = this.posts.map(fg => new FormGroup({ content: new FormControl('', [ Validators.required ]) }));
      
      resolve();

    });
    
  }

  public async createPost(): Promise<void> {

    this.spinnerService.showSpinner();

    const postContent = this.createPostGroup.get('content')?.value;
    const newPost: NewPost = {
      title: 'Do I actually need a title here?',
      authorId: String(1),
      content: postContent
    };
  
    const createdPost = await this.postService.createPost(newPost);

    if (createdPost){

      await this.fetchPosts();
      this.createPostGroup.reset();

    }
    
    this.spinnerService.hideSpinner();

  }

  public async editPost(index: number, post: Post): Promise<void> {

    this.spinnerService.showSpinner();

    const newPost: Post = {
      _id: post._id,
      authorId: String(1),
      title: 'Updated titile',
      content: this.editForms[index].get('content')?.value
    };

    const updatedPost = await this.postService.updatePost(newPost);

    if (updatedPost) {

      this.cancelEditPost(index);
      this.fetchPosts();

    }
    this.spinnerService.hideSpinner();

  }

  public async deletePost(post: Post): Promise<void> {

    this.spinnerService.showSpinner();

    const success = await this.postService.deletePost(post);

    if (success) {

      this.fetchPosts();

    }
    
    this.spinnerService.hideSpinner();

  }

  // Used for debugging - striginfies array elements returned by server.
  public displayPost(post: Post){
    return JSON.stringify(post);
  }

  // Format date from JS Date to DD/MM/YYYY HH:mm:SS format
  public formatDate(creationDate: Date): string {
    return this.dateService.formatToDayMonthYearTimeFormat(creationDate);
  }

  public editPostTimeIsValid(post: Post): boolean {

    const creationTime = DateTime.fromJSDate(new Date(post.createdAt!));
    const now = DateTime.now();

    const diff = now.toMillis() - creationTime.toMillis();

    // If difference is 15 minutes - don't show 'Edit Post'
    return diff <= 900000;

  }

  public trackPostByIndex(index: number): number {
    return index;
  }

  public showEditArea(index: number): void {
    this.canDisplayEditArea[index] = true;
    this.canDisplayEditButton[index] = false;
  }

  public cancelEditPost(index: number): void {
    this.canDisplayEditArea[index] = false;
    this.canDisplayEditButton[index] = true;
  }

}

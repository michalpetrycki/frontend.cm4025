import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/interfaces/post.interface';
import { DateService } from 'src/app/services/date/date.service';
import { PostService } from 'src/app/services/post.service';
import { DateTime } from 'luxon';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  showUpdateButton: boolean;
  createPostGroup: FormGroup;
  canDisplayEditArea: boolean[];
  canDisplayEditButton: boolean[];
  editForms: FormGroup[];
  displayLoginModal: boolean;
  displayRegisterModal: boolean;
  closeRegistrationModalSubscription: Subscription | undefined;
  closeLoginModalSubscription: Subscription | undefined;
  isUserLoggedInSubscription: Subscription | undefined;
  isUserLoggedIn: boolean;

  constructor(private postService: PostService, private dateService: DateService,
    private spinnerService: SpinnerService, private authenticationService: AuthenticationService) 
  {

    this.spinnerService.showSpinner();

    this.displayLoginModal = false;
    this.displayRegisterModal = false;

    this.posts = [];
    this.showUpdateButton = false;
    this.createPostGroup = new FormGroup({

      content: new FormControl('', [ Validators.required ]),
      
    });

    this.canDisplayEditArea = [];
    this.canDisplayEditButton = [];

    this.editForms = [];

    this.closeLoginModalSubscription = this.authenticationService.closeLoginModalSubject.subscribe(closeModal => {
      this.displayLoginModal = closeModal;
    });

    this.closeRegistrationModalSubscription = this.authenticationService.closeRegistrationModalSubject.subscribe(closeModal => {
      this.displayRegisterModal = closeModal;
    });

    this.isUserLoggedInSubscription = this.authenticationService.isUserLoggedInSubject.subscribe(loggedIn => {
      this.isUserLoggedIn = loggedIn;
    });

    this.isUserLoggedIn = this.authenticationService.isUserAuthenticated;

  }

  async ngOnInit(): Promise<void> {

    await this.fetchPosts();
    this.spinnerService.hideSpinner();

  }

  ngOnDestroy(): void {
    
    if (this.isUserLoggedInSubscription){
      this.isUserLoggedInSubscription.unsubscribe();
    }

    if (this.closeLoginModalSubscription){
      this.closeLoginModalSubscription.unsubscribe();
    }

    if (this.closeRegistrationModalSubscription){
      this.closeRegistrationModalSubscription.unsubscribe();
    }

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

    return new Promise<void>(async (resolve, reject) => {

      this.spinnerService.showSpinner();

      const postContent = this.createPostGroup.get('content')?.value;
      const newPost: Post = {
        title: 'Do I actually need a title here?',
        authorId: this.authenticationService.currentUser?._id || String(-1),
        content: postContent
      };
    
      const createdPost = await this.postService.createPost(newPost);

      if (createdPost){

        await this.fetchPosts();
        this.createPostGroup.reset();

      }
      
      this.spinnerService.hideSpinner();

      resolve();

    });

  }

  public async editPost(index: number, post: Post): Promise<void> {

    return new Promise<void>(async(resolve, reject) => {

      this.spinnerService.showSpinner();

      const newPost: Post = {
        _id: post._id,
        authorId: this.authenticationService.currentUser?._id || String(-1),
        title: 'Updated titile',
        content: this.editForms[index].get('content')?.value
      };

      const updatedPost = await this.postService.updatePost(newPost);

      if (updatedPost) {

        this.cancelEditPost(index);
        this.fetchPosts();

      }
      this.spinnerService.hideSpinner();

      resolve();

    });

  }

  public async deletePost(post: Post): Promise<void> {

    return new Promise<void>(async(resolve, reject) => {

      this.spinnerService.showSpinner();

      const success = await this.postService.deletePost(post);

      if (success) {

        this.fetchPosts();

      }
      
      this.spinnerService.hideSpinner();
      resolve();

    });

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

  public userIsAuthor(post: Post): boolean {
    return this.authenticationService.currentUser?._id === post.authorId && post.authorId !== String(-1);
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

  public openLoginModal(): void {
    this.displayLoginModal = true;
  }

  public openRegisterModal(): void {
    this.displayRegisterModal = true;
  }

}

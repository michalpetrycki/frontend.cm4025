import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/models/interfaces/user.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DateService } from 'src/app/services/date/date.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  public currentUser: User | undefined;
  public showPicture = true;
  
  currentUserModel: any;
  currentUserUpdateSubscription: Subscription | undefined;
  
  
  constructor(private authenticationService: AuthenticationService, private dateService: DateService, 
    private spinnerService: SpinnerService, private userService: UserService) {

    this.spinnerService.showSpinner();
    this.currentUser = this.authenticationService.currentUser;
    this.spinnerService.hideSpinner();

    this.currentUserModel = {
      propertyToEdit1: this.currentUser?.propertyToEdit1,
      propertyToEdit2: this.currentUser?.propertyToEdit2,
      propertyToEdit3: this.currentUser?.propertyToEdit3,
      propertyToEdit4: this.currentUser?.propertyToEdit4
    };

    this.currentUserUpdateSubscription = this.authenticationService.currentUserSubject.subscribe(updatedUser => {
      this.currentUser = updatedUser;
    });

    // this.currentUser!.avatarUrl = 'https://images.pexels.com/photos/11213532/pexels-photo-11213532.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';

    // this.showPicture = this.currentUser?.avatarUrl !== undefined;
    
  }

  ngOnInit(): void {
  }

  public shouldInputBeDisabled(propertyName: string): boolean {
    
    switch (propertyName){

      case 'role':
      case 'username':
      case 'email':
      case 'createdAt':
      case 'updatedAt':
        return true;

      default: return false;

    }

  }

  public formatDateString(jsDateFormat: Date | undefined): string{
    return this.dateService.formatToDayMonthYearTimeFormat(jsDateFormat);
  }

  public async updateProfile(): Promise<void> {

    return new Promise<void>(async(resolve, reject) => {

      this.spinnerService.showSpinner();

      const userToUpdate: User = {

        _id: this.currentUser?._id,
        email: this.currentUser?.email!,
        role: this.currentUser?.role!,
        username: this.currentUser?.username!,
        createdAt: this.currentUser?.createdAt!,
        updatedAt: this.currentUser?.updatedAt!,
        propertyToEdit1: this.currentUserModel.propertyToEdit1,
        propertyToEdit2: this.currentUserModel.propertyToEdit2,
        propertyToEdit3: this.currentUserModel.propertyToEdit3,
        propertyToEdit4: this.currentUserModel.propertyToEdit4

      }

      const updatedUserSuccess = await this.userService.updateUser(userToUpdate);

      if (updatedUserSuccess) {

        this.authenticationService.setCurrentUser();

      }

      this.spinnerService.hideSpinner();

      resolve();

    });

  }

  public toggleUpdatePictureButton(): void {
    
    // this.showUpdatePictureButton = !this.showUpdatePictureButton;

  }

  public openUpdatePictureModal(event: any): void {
    
    console.warn('update');
    console.log(event.target.files);

  }

  public openUploadPictureModal(event: any): void {

    console.warn('upload');
    console.log(event.target.files);

  }

}

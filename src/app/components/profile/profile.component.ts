import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/entities/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  public currentUser: User | undefined;
  public showPicture = true;
  
  
  constructor(private authenticationService: AuthenticationService, private dateService: DateService) {

    this.currentUser = this.authenticationService.loggedUser;

    this.currentUser!.avatarUrl = 'https://images.pexels.com/photos/11213532/pexels-photo-11213532.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';

    this.showPicture = this.currentUser?.avatarUrl !== undefined;
    
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

  public updateProfile(): void {
    alert('Profile updated');
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

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/entities/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

  public currentUser: User | undefined;

  constructor(private authenticationService: AuthenticationService, private dateService: DateService) {

    this.currentUser = this.authenticationService.loggedUser;

  }

  ngOnInit(): void {
  }

  public shouldInputBeDisabled(propertyName: string): boolean {
    
    switch (propertyName){

      case 'role': 
      case 'username': 
        return true;

      default: return false;

    }

  }

  public formatDateString(jsDateFormat: Date | undefined): string{
    return this.dateService.formatToDayMonthYearTimeFormat(jsDateFormat);
  }

}

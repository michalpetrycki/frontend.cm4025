import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/interfaces/user.interface';
import { DateService } from 'src/app/services/date/date.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private spinnerService: SpinnerService, private dateService: DateService) { 

    this.spinnerService.showSpinner();
    this.users = [];

  }

  async ngOnInit(): Promise<void> {

    await this.fetchsUsers();
    this.spinnerService.hideSpinner();

  }

  private async fetchsUsers(): Promise<void> {

    return new Promise<void>(async (resolve) => {

      this.users = await this.userService.fetchUsers();
      resolve();

    });
    
  }

  displayUser(user: any){
    return JSON.stringify(user);
  }

  formatDate(date: Date): string {
    return this.dateService.formatToDayMonthYearTimeFormat(date);
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/entities/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

  public currentUser: User | undefined;

  constructor(private authenticationService: AuthenticationService) {

    this.currentUser = this.authenticationService.loggedUser;

  }

  ngOnInit(): void {
  }

}

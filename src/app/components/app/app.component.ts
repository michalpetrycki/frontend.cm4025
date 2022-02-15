import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  isAuthenticated = false;

  constructor(private authenticationService: AuthenticationService) {

    this.isAuthenticated = authenticationService.isUserAuthenticated;

  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private routerService: RouterService) { }

  ngOnInit(): void {

    this.authenticationService.logout();
    setTimeout(() => {

      this.routerService.navigateTo('login');

    }, 1500);

  }

}

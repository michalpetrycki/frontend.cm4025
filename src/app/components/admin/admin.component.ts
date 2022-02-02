import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  users = <any>[];

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {

    try{
      this.users = await this.userService.fetchUsers();
    }
    catch (error){
      console.log(error);
    }

    try{
      this.userService.registerUser({ username: 'username', password: 'password', email: 'email', role: 'role' });
    }
    catch (error){
      console.log(error);
    }
    
  }

}

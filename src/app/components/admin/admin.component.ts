import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  users = <any>[];

  constructor(private usersService: UsersService) { }

  async ngOnInit(): Promise<void> {

    this.users = await this.usersService.fetchUsers();

  }

}

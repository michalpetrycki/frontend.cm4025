import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  constructor(private navigationService: NavigationService) { 
  }

  ngOnInit(): void {
  }

  back(): void {
    this.navigationService.back();
  }

}

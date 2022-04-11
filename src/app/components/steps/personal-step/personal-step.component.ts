import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-personal-step',
  templateUrl: './personal-step.component.html',
  styleUrls: ['./personal-step.component.sass']
})
export class PersonalStepComponent implements OnInit {

  personalInformation: any;

  submitted: boolean = false;

  constructor(private routerService: RouterService, private checkoutService: CheckoutService) { }

  ngOnInit() { 
    this.personalInformation = this.checkoutService.checkoutInformation.personalInformation || {};
  }

  nextPage() {

    if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
      
      this.checkoutService.checkoutInformation.personalInformation = this.personalInformation;
      this.routerService.navigateTo('checkout/address');
      return;

    }

    this.submitted = true;
  
  }
}

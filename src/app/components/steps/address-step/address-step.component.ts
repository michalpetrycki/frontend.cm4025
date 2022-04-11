import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-address-step',
  templateUrl: './address-step.component.html',
  styleUrls: ['./address-step.component.sass']
})
export class AddressStepComponent implements OnInit {

  addressInformation: any;

  submitted: boolean = false;

  constructor(private routerService: RouterService, private checkoutService: CheckoutService) { }

  ngOnInit(): void { 
    this.addressInformation = this.checkoutService.checkoutInformation.addressInformation || {};
  }

  nextPage(): void {

    if (this.addressInformation.street && this.addressInformation.city && this.addressInformation.country 
        && this.addressInformation.postcode) {
      
      this.checkoutService.checkoutInformation.addressInformation = this.addressInformation;
      this.routerService.navigateTo('checkout/payment');
      return;

    }

    this.submitted = true;
  }

  prevPage(): void {
    this.routerService.navigateTo('checkout/personal');
  }

}

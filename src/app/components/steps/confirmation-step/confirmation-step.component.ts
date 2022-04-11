import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.sass']
})
export class ConfirmationStepComponent implements OnInit {

  confirmationInformation: any;
    
  constructor(private routerService: RouterService, private checkoutService: CheckoutService) {

    this.confirmationInformation = this.checkoutService.checkoutInformation || {};

  }

  ngOnInit() { 
  }

  complete() {
    this.checkoutService.complete();
  }

  prevPage() {
    this.routerService.navigateTo('checkout/payment');
  }

}

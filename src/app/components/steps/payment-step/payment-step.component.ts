import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-payment-step',
  templateUrl: './payment-step.component.html',
  styleUrls: ['./payment-step.component.sass']
})
export class PaymentStepComponent implements OnInit {

  paymentInformation: any;

  submitted: boolean = false;

  constructor(private routerService: RouterService, private checkoutService: CheckoutService) {}

  ngOnInit(): void { 
    this.paymentInformation = this.checkoutService.checkoutInformation.paymentInformation || {};
  }

  nextPage(): void {

    if (this.paymentInformation.cardholderName && this.paymentInformation.cardholderNumber 
        && this.paymentInformation.date && this.paymentInformation.cvv) {
      
      this.checkoutService.checkoutInformation.paymentInformation = this.paymentInformation;
      this.routerService.navigateTo('checkout/confirmation');
      return;

    }

    this.submitted = true;

  }

  prevPage(): void {
    this.routerService.navigateTo('checkout/address');
  }

}

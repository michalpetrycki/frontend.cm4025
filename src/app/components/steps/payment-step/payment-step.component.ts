import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-payment-step',
  templateUrl: './payment-step.component.html',
  styleUrls: ['./payment-step.component.sass']
})
export class PaymentStepComponent implements OnInit {

  paymentInformation: any;

  constructor(private routerService: RouterService) { }

  ngOnInit() { 
    // this.paymentInformation = this.ticketService.ticketInformation.paymentInformation;
  }

  nextPage() {
    if (this.paymentInformation.cardholderName && this.paymentInformation.cardholderNumber && this.paymentInformation.date && this.paymentInformation.cvv) {
      // this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
      this.routerService.navigateTo('steps/confirmation');
    }
  }

  prevPage() {
    this.routerService.navigateTo('steps/seat');
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  steps: MenuItem[];
  subscription: Subscription | null;

  constructor() {

    this.steps = [
      {
        label: 'Personal',
        routerLink: 'personal'
      },
      {
        label: 'Payment',
        routerLink: 'payment'
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation'
      }
    ];

    this.subscription = null;
    // this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) =>{
    //   this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
    // });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

  public sendOrder(): void {
    alert('Send order');
  }

}

interface MenuItem {
  label?: string;
  routerLink?: string
}
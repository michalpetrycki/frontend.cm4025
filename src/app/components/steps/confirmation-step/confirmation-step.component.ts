import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.sass']
})
export class ConfirmationStepComponent implements OnInit {

  ticketInformation: any;
    
  constructor(private routerService: RouterService) { }

  ngOnInit() { 
    // this.ticketInformation = this.ticketService.ticketInformation;
  }

  complete() {
    // this.ticketService.complete();
  }

  prevPage() {
    this.routerService.navigateTo('steps/payment');
  }

}

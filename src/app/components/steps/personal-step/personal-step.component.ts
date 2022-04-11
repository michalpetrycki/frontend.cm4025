import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-personal-step',
  templateUrl: './personal-step.component.html',
  styleUrls: ['./personal-step.component.sass']
})
export class PersonalStepComponent implements OnInit {

  personalInformation: any;

  submitted: boolean = false;

  constructor(private routerService: RouterService) { }

  ngOnInit() { 
    // this.personalInformation = this.ticketService.getTicketInformation().personalInformation;
  }

  nextPage() {

    if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
      // this.ticketService.ticketInformation.personalInformation = this.personalInformation;
      this.routerService.navigateTo('steps/seat');

      return;
    }

    this.submitted = true;
  
  }
}

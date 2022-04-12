import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  showSpinner: boolean;
  spinnerSubscription: Subscription | undefined;
  
  constructor(private spinnerService: SpinnerService) {
    this.showSpinner = false;
  }

  ngOnInit(): void { 

    this.spinnerSubscription = this.spinnerService.spinnerSubject.subscribe(showSpinner => {
      
      if (showSpinner !== undefined){
        this.showSpinner = showSpinner;
      }
      
    });

  }

  ngOnDestroy(): void {
    if (this.spinnerSubscription){
      this.spinnerSubscription?.unsubscribe();
    }
  }

}

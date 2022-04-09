import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isSpinnerDisplayed: boolean;
  spinnerSubject: BehaviorSubject<boolean>;

  constructor() { 
    this.isSpinnerDisplayed = false;

    this.spinnerSubject = new BehaviorSubject<boolean>(false);

  }

  public showSpinner(): void {

    this.isSpinnerDisplayed = true;
    this.spinnerSubject.next(true);

  }

  public hideSpinner(): void {
    
    this.isSpinnerDisplayed = false;
    this.spinnerSubject.next(false);

  }

}

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig, private spinnerService: SpinnerService) { }

  public showSuccess(messageText: string): void{
    this.messageService.add({ severity: 'success', summary: 'Success', detail: messageText });
  }

  public showError(response: HttpErrorResponse | string): void{

    if (response instanceof HttpErrorResponse) {
      this.messageService.add({ severity: 'error', summary: response?.error.status, detail: response?.error.message });
      setTimeout(() => {
        this.spinnerService.hideSpinner();
      }, 1000);
    }
    else if (typeof response === 'string') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: String(response) });
    }
    
  }

}

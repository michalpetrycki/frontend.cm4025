import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  public showSuccess(messageText: string): void{
    this.messageService.add({ severity: 'success', summary: 'Success', detail: messageText });
  }

  public showError(response: HttpErrorResponse): void{
    this.messageService.add({ severity:'error', summary: response.error.status, detail: response.error.message });
  }

}

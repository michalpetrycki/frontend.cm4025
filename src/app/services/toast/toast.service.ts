import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { PrimeNGConfig } from 'primeng/api';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  public showSuccess(apiOperation: string, statusText: string): void{

    const messageText = this.getMessageText(apiOperation, statusText)

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }

  public showError(response: HttpErrorResponse): void{

    this.messageService.add({ severity:'error', summary: response.error.status, detail: response.error.message });

  }

  private getMessageText(apiOperation: string, statusText: string): string{

    let message = '';

    switch (apiOperation){

      case ApiOperation.register: message = 'New User ';
            break;
      default: message = 'Enter message here';
            break;

    }

    message += ' ' + statusText;

    return message;

  }

}

// Copied from https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core'
import { NavigationService } from 'src/app/services/navigation/navigation.service'

@Directive({
  selector: '[back-button]',
})
export class BackButtonDirective {
  
  constructor(private navigation: NavigationService, private elRef: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    this.navigation.back()
  }
  
}

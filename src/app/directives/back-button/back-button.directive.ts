// Copied from https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page
import { Directive, HostListener } from '@angular/core'
import { NavigationService } from 'src/app/services/navigation/navigation.service'

@Directive({
  selector: '[back-button]',
})
export class BackButtonDirective {
  
  constructor(private navigation: NavigationService) {}

  @HostListener('click')
  onClick(): void {
    this.navigation.back()
  }
  
}

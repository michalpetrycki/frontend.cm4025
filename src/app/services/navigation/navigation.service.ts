// Copied from https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page
import { Injectable, OnDestroy } from '@angular/core'
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class NavigationService implements OnDestroy {
  private history: string[] = []

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    })
  }

  ngOnDestroy(): void {
    
    const subscription = this.router.events.subscribe();
    if (subscription) {
      subscription.unsubscribe();
    }

  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
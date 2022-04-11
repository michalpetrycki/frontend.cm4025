import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { ShopManagementComponent } from 'src/app/components/shop-management/shop-management.component';
import { ShopComponent } from 'src/app/components/shop/shop.component';
import { BasketComponent } from 'src/app/components/basket/basket.component';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { PersonalStepComponent } from 'src/app/components/steps/personal-step/personal-step.component';
import { PaymentStepComponent } from 'src/app/components/steps/payment-step/payment-step.component';
import { ConfirmationStepComponent } from 'src/app/components/steps/confirmation-step/confirmation-step.component';
import { AddressStepComponent } from 'src/app/components/steps/address-step/address-step.component';

const routes: Routes = [

  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'shop-management', component: ShopManagementComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'basket', component: BasketComponent },

  { path: 'checkout', component: CheckoutComponent,
    children: [

      { path: 'personal', component: PersonalStepComponent },
      { path: 'address', component: AddressStepComponent },
      { path: 'payment', component: PaymentStepComponent },
      { path: 'confirmation', component: ConfirmationStepComponent },

    ] 
  },

  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

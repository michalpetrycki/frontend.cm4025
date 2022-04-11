// Common modules
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Other modules 
import { AppRoutingModule } from 'src/app/modules/app-routing.module';

// Components
import { AppComponent } from 'src/app/components/app/app.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { ShopComponent } from 'src/app/components/shop/shop.component';
import { ShopManagementComponent } from 'src/app/components/shop-management/shop-management.component';
import { BasketComponent } from 'src/app/components/basket/basket.component';

// Primeng modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';


// Interceptor
import { JwtInterceptor } from 'src/app/services/http-interceptor/JwtInterceptor';
import { MessageService } from 'primeng/api';

// Services
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

// Modules
import { DirectivesModule } from 'src/app/modules/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    UsersComponent,
    PostsComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    LogoutComponent,
    ProfileComponent,
    ShopComponent,
    ShopManagementComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    TooltipModule, 
    ToastModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    DialogModule,
    DropdownModule,
    TableModule,
    DataViewModule,
    RatingModule,
    DirectivesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MessageService,
    ApiEndpointsService,
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => null,
      deps: [NavigationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

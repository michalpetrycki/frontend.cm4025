// Common modules
import { NgModule } from '@angular/core';
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

// Primeng modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

// Interceptor
import { JwtInterceptor } from 'src/app/services/http-interceptor/JwtInterceptor';
import { MessageService } from 'primeng/api';

// Services
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';


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
    ProfileComponent
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
    ToastModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MessageService,
    ApiEndpointsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

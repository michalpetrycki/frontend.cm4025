import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/components/app/app.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    UsersComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

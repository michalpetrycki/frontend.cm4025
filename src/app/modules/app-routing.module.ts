import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { UserDetailComponent } from 'src/app/components/user-detail/user-detail.component';

const routes: Routes = [

  { path: 'admin', component: AdminComponent },
  { path: 'userDetail', component: UserDetailComponent },
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

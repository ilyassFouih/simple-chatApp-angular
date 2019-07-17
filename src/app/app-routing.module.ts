import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
  {
    path:"",
    component:SigninComponent
  },
  {
    path:"sign-up",
    component:SignupComponent
  },
  {
    path:"chat",
    component:ChatComponent,
    canActivate:[UserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

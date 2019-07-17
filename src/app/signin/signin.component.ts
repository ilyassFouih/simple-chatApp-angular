import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.class';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user: User = new User();
  error = { state: false, content: "" };

  constructor(private userService: UserService,
              private router:Router) { }

  ngOnInit() {
  }

  signIn() {
    if (this.user.userName)
      this.userService.checkUser(this.user.userName)
        .toPromise()
        .then((data: any) => {
          console.log(data)
          if (data.status == 1){
            this.error={state:false,content:""}
            this.userService.connectedUser = data.data
            this.router.navigate(["/chat"])
          }else
          this.error={state:true,content:data.message}


        })
        .catch(error => {
          console.error(error)
          this.error = { state: true, content: "server error !" }
        })
    else
      this.error = { state: true, content: "enter a valide user name" }
  }

}

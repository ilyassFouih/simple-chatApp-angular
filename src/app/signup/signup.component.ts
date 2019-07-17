import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.class';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error = { state: false, content: [] }
  user: User = new User();

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }


  signUp() {
    console.log(this.user)
    if (this.validateInput()) {
      this.userService.signUp(this.user)
        .toPromise()
        .then((data: any) => {
          console.log(data)
          this.error = { state: false, content: [] }
          if (data.status == 1) {
            this.userService.connectedUser = data.data
            this.router.navigate(["/chat"])
          } else {
            this.error = { state: true, content: [data.message] }
          }
        })
        .catch(error => {
          console.log(error)
          this.error = { state: false, content: [] }
          this.error = { state: true, content: ["server Error !!"] }
        })

    } else
      this.error.state = true

  }

  validateInput(): boolean {
    let validForm = true
    this.error = { state: false, content: [] }
    if (this.user.firstName == "") {
      this.error.content.push("first name is required")
      validForm = false
    }
    if (this.user.lastName == "") {
      this.error.content.push("last name is required")
      validForm = false
    }
    if (this.user.userName == "") {
      this.error.content.push("user name is required")
      validForm = false
    }
    return validForm;
  }
}

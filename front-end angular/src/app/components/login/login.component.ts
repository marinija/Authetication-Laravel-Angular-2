import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    this.auth.signin(form.value.email, form.value.password)
      .subscribe(
        tokenData => console.log(tokenData),
        error => console.log(error)
      );
  }
}

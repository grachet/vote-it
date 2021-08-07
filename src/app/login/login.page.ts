import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid address' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'The password must be at least 5 characters long. ' }
    ]
  };

  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('guillaume.rachet@gmail.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('password', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value) {
    this.authService.SignIn(value.email, value.password)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['home']);
        } else {
          this.errorMessage = 'Email is not verified';
          return false;
        }
      }).catch((error) => {
        this.errorMessage = error.message;
      })
  }

  goRegisterPage() {
    this.router.navigate(['/registration']);
  }

}

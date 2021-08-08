import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { FirebaseService } from './../services/firebase.service';

@Component({
  selector: 'app-add-vote',
  templateUrl: './add-vote.page.html',
  styleUrls: ['./add-vote.page.scss'],
})
export class AddVotePage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'title': [
      { type: 'required', message: 'Title is required' },
      { type: 'minlength', message: 'Title must be at least 10 characters long. ' }
    ],
    'hashtag': [
      { type: 'minlength', message: 'Hashtag must be at least 3 characters long. ' }
    ]
  };

  constructor(
    public firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.required,
      ])),
      hashtag: new FormControl('', Validators.compose([
        Validators.minLength(3),
      ])),
    });
  }

  save(value) {
    this.firebaseService.createVote(value)
      .then((res) => {
        console.log(res)
        this.router.navigate(['home']);
      }).catch((error) => {
        console.log(error)
        this.errorMessage = error.message;
      })
  }

}

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // votes = [
  //   {
  //     "title": "Is eating a good idea ?",
  //     "answers": {
  //       "guillaume.rachet@gmail.com": true,
  //       "gilles": false,
  //     },
  //     "hashtag": "#food #health"
  //   },
  //   {
  //     "title": "Blue is the best color ?",
  //     "answers": {
  //       "guillaume.rachet@gmail.com": true,
  //       "gilles": false,
  //     },
  //     "hashtag": "#color"
  //   }
  // ]

  votes = JSON.stringify({
    // 1: {
    //   "title": "Is eating a good idea ?",
    //   "answers": {
    //     "guillaume.rachet@gmail.com": true,
    //     "gilles": false,
    //   },
    //   "hashtag": "#food #health"
    // },
    // 2: {
    //   "title": "Blue is the best color ?",
    //   "answers": {
    //     "guillaume.rachet@gmail.com": true,
    //     "gilles": false,
    //   },
    //   "hashtag": "#color"
    // }
  })


  constructor(
    public authService: AuthenticationService,
    // public loadingCtrl: LoadingController,
    private firestore: AngularFirestore
  ) { }



}

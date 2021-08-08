import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Vote } from '../models/vote';
import { AuthenticationService } from './../services/authentication.service';
import { FirebaseService } from './../services/firebase.service';
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

  votesDisplay = JSON.stringify({
    1: {
      "title": "Is eating a good idea ?",
      "answers": {
        "guillaume.rachet@gmail.com": true,
        "gilles": false,
      },
      "hashtag": "#food #health"
    },
    2: {
      "title": "Blue is the best color ?",
      "answers": {
        "guillaume.rachet@gmail.com": true,
        "gilles": false,
      },
      "hashtag": "#color"
    }
  })

  votes: Array<Vote>;

  constructor(
    public authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    private firebaseService: FirebaseService,
    public router: Router
  ) { }

  // ngOnInit() {

  //   firebaseService

  //   this.getData();
  // }

  // async getData() {

  // }

  // async presentLoading(loading) {
  //   return await loading.present();
  // }

  goAddVotePage() {
    this.router.navigate(['/add-vote']);
  }

}

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { observable, Observable } from 'rxjs';
import { Vote } from '../models/vote';
import { AuthenticationService } from './../services/authentication.service';
import { FirebaseService } from './../services/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  votes: Array<Vote> = [];

  constructor(
    public authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    private firebaseService: FirebaseService,
    public router: Router
  ) {
    this.firebaseService.getVotes().then(observable => observable.subscribe(data => {
      console.log(data)
      this.votes = data.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          hashtag: e.payload.doc.data()['hashtag'],
          answers: e.payload.doc.data()['answers'],
          thumbUp: 5,
          thumbDown: 4,
        };
      });
    }));;
  }

  addUp(id: string) {
    console.log(id)
  }

  addDown(id: string) {
    console.log(id)
  }

  goAddVotePage() {
    this.router.navigate(['/add-vote']);
  }

}

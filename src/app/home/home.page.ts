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
      this.votes = data.map(e => {
        const answers = e.payload.doc.data()['answers'];
        console.log(answers)
        let thumbUp = 0;
        let thumbDown = 0;
        let isMyVoteUp = false;
        let isMyVoteDown = false;
        Object.entries(answers || {}).forEach(([user, isUp]) => {
          isUp ? thumbUp++ : thumbDown++;
          if (user === authService.userData?.email) {
            isUp ? isMyVoteUp = true : isMyVoteDown = true;
          }
        })
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          hashtag: e.payload.doc.data()['hashtag'],
          answers,
          thumbUp,
          thumbDown,
          isMyVoteUp,
          isMyVoteDown,
        };
      });
    }));;
  }

  addUp(id: string) {
    this.firebaseService.updateVote(id, true);
  }

  addDown(id: string) {
    this.firebaseService.updateVote(id, false);
  }

  goAddVotePage() {
    this.router.navigate(['/add-vote']);
  }

}

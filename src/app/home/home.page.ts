import { Component } from '@angular/core';
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

  indexToId: { [key: number]: string } = {};
  filterTerm: string;
  votes: Array<Vote> = [];

  constructor(
    public authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    private firebaseService: FirebaseService,
    public router: Router
  ) {
    this.firebaseService.getVotes().then(observable => observable.subscribe(data => {
      this.votes = data
        .sort((a: any, b: any) => b.payload.doc.data()['timestamp'] - a.payload.doc.data()['timestamp'])
        .map((e: any, i: number) => {
          const answers = e.payload.doc.data()['answers'];
          this.indexToId[i] = e.payload.doc.id;
          let thumbUp = 0;
          let thumbDown = 0;
          let isMyVoteUp = false;
          let isMyVoteDown = false;
          Object.entries(answers || {}).forEach(([uid, isUp]) => {
            isUp ? thumbUp++ : thumbDown++;
            if (uid === authService.userData?.uid) {
              isUp ? isMyVoteUp = true : isMyVoteDown = true;
            }
          })
          return {
            title: e.payload.doc.data()['title'],
            hashtag: e.payload.doc.data()['hashtag'],
            index: i,
            thumbUp,
            thumbDown,
            isMyVoteUp,
            isMyVoteDown,
          };
        });
    }));;
  }

  addUp(index: number) {
    this.firebaseService.updateVote(this.indexToId[index], true);
  }

  addDown(index: number) {
    this.firebaseService.updateVote(this.indexToId[index], false);
  }

  goAddVotePage() {
    this.router.navigate(['/add-vote']);
  }

}

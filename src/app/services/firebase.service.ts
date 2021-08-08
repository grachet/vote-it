import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  getVotes() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('/votes').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  updateVote(index, isThumbUp) {
    console.log(isThumbUp)
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('votes').doc(index).update({
        answers: { [currentUser.email]: isThumbUp }
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  createVote(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/votes').add({
        title: value.title,
        hashtag: value.hashtag,
        answers: {}
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  // deleteVote(taskKey) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
  //       .then(
  //         res => resolve(res),
  //         err => reject(err)
  //       );
  //   });
  //   let currentUser = firebase.auth().currentUser;
  // }
}

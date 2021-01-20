import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app'
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
export interface User {
  uid: string;
  email: string;
  
}
 
export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
  
}
 
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;
 
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private authService: AuthenticateService,private navCtrl: NavController,) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;      
    });
  }
 
  async signup({ email, password }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
 
    const uid = credential.user.uid;
 
    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    })
  }
 
  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
 
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
 // Chat functionality
 
addChatMessage(msg, userEmail) {
  return this.afs.collection('messages').add({
    msg: msg,
    from: this.currentUser.uid,
    fromName: userEmail,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}
 
getChatMessages() {
  
  return this.getUsers().pipe(
    switchMap(res => {
     
      return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
    }),
    map(messages => {
      // Get the real name for each user
      for (let m of messages) {
        if(m.fromName==this.getUserForMsg()){          
        m.fromName = this.getUserForMsg();
        m.myMsg = this.currentUser.uid === m.from;
      }
      }        
      return messages
    })
  )
}
 
private getUsers() {
  return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
}
userEmail: string;
private getUserForMsg(): string { 
     
  this.authService.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
      this.userEmail = res.email;
    } else {
      this.navCtrl.navigateBack('');
    }
  }, err => {
    console.log('err', err);
  })
  return this.userEmail;
}
}
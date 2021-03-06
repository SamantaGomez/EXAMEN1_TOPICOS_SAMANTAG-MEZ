import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from '../shared/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
   }
   //método para inicio de sesión
   async onLogin(user:User){
     try {
       return await this.afAuth.signInWithEmailAndPassword(
         user.email,
         user.password
       );
     } catch(error) {
       console.log('Error en el inicio de sesión', error);
     }
   }
   //método para registro
   async onRegister(user:User){
    try {
      return await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch(error) {
      console.log('Error al registrar el usuario', error);
    }
  }
}

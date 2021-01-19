import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authSvc: AuthService, 
    private router: Router,
    private afAuth: AngularFireAuth) { }

    onLogout(){
      console.log('Cerrar sesión!');
      this.afAuth.signOut();
      this.router.navigateByUrl('/ingreso');
    }

}

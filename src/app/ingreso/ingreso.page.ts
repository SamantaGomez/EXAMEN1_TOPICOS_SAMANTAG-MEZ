import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../shared/user.class';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  user: User = new User();
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {}

  async onLogin() {
    const user = await this.authSvc.onLogin(this.user);
    if(user) {
      console.log('Ingreso con éxito!');
      this.router.navigateByUrl('/');
    }
  }

}

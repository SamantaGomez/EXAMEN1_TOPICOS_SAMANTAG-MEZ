
import { Component, OnInit,ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  userEmail: string;
  @ViewChild(NavController) content: NavController;
  messages: Observable<any[]>;
  newMsg = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private chatService: ChatService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
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

  }
  sendMessage() {
      this.chatService.addChatMessage(this.newMsg,this.userEmail).then(() => {
      this.newMsg = '';
      //this.content.scrollToButton();
      this.messages = this.chatService.getChatMessages();
    });
  }
  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}

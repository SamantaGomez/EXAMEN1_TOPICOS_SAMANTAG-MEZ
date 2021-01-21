
import { Component, OnInit,ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ChatService, Message } from '../services/chat.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';;
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as crypto from 'crypto-js';
import { finalize, tap } from 'rxjs/operators';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  
  @ViewChild(NavController) content: NavController;
  messages: Observable<any[]>;
  newMsg = '';
  UploadedFileURL: Observable<string>;
  fileName:string;
  fileSize:number;
  isUploading:boolean;
  isUploaded:boolean;
  messageList = [];
  messageData: Message;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  passEnc : string;
  Image: string;
  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private chatService: ChatService, 
    private router: Router,
    private storage: AngularFireStorage,
  ) { 
    this.isUploading = false;
    this.isUploaded = false;
  }

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
  //para imagenes
uploadFile(event: FileList) {    
  const file = event.item(0)

  if (file.type.split('/')[0] !== 'image') { 
   console.error('unsupported file type :( ')
   return;
  }

  this.isUploading = true;
  this.isUploaded = false;

  this.fileName = file.name;
  const path = `${new Date().getTime()}_${file.name}`;
  const customMetadata = { app: 'Freaky Image Upload Demo' };
  const fileRef = this.storage.ref(path);
  this.task = this.storage.upload(path, file, { customMetadata });
  this.percentage = this.task.percentageChanges();
  this.snapshot = this.task.snapshotChanges().pipe(
    finalize(() => {

      this.passEnc = '123123';
      this.UploadedFileURL = fileRef.getDownloadURL();
      
      this.UploadedFileURL.subscribe(resp=>{
        this.messageData.Image = crypto.AES.encrypt(resp, this.passEnc).toString();
      },error=>{
        console.error(error);
      })
    })
  )
}  
}

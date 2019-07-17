import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NgForm } from '@angular/forms';
import { Message } from '../models/message.class';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public users: number = 0;
  public message: Message = new Message();
  public messages: Message[] = [];

  constructor(private chatService: ChatService,
              public userService:UserService){

  }


  ngOnInit(){

    this.chatService.receiveChat()
    .subscribe((messages: Message[]) => {
      console.log(messages)
      this.messages=messages;
    });

    this.chatService.getUsers()
    .subscribe((users: number) => {
      console.log(users)
      this.users = users;
    });

  }

  addChat(){
    this.message.user=this.userService.connectedUser
    this.messages.push(this.message);
    this.chatService.sendChat(this.message);
    this.message= new Message()
  }

}

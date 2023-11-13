import { Component, ViewChild } from '@angular/core';
import { message } from './message.interface';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('form')
  form!: NgForm;
  newMessage$!: Observable<string>;
messages:message[]=[];
users:string[]=[];

//users:User[]=[];
constructor(private chatService:ChatService){}
ngOnInit() {
  this.chatService.getMessages().subscribe((newMessages: message[]) => {
    // Konvertujte objekte Chat u stringove i dodajte ih u niz messages
    this.messages = newMessages.map((message) => message);
    
  });
   this.chatService.getNewMessage().subscribe((message:message)=>{
    console.log(message);
    this.messages.push(message);
  })
 
}
onSubmit(){
const {message}=this.form.value;
if(!message)return;
  this.chatService.sendMessage(message);
  this.form.reset();
}
}


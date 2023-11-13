import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { Observable,of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { message } from '../chat/message.interface';
@Injectable()
export class ChatService {
    constructor(private socket:Socket)
    {

    }
    sendMessage(text: string,username?:string):void{
      console.log(text,username);
      const data = {text,username};
        this.socket.emit('sendMessage',data);
    }
    getNewMessage():Observable<any>{
      this.socket.fromEvent<any>('newMessage').subscribe((re: any)=>{console.log(re)});
        return this.socket.fromEvent<any>('newMessage');
    }
   
    getMessages(): Observable<message[]> {
      this.socket.emit('getMessages');
      return this.socket.fromEvent<message[]>('allMessages');
    }
    
}
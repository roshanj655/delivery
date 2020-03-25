import { Component, OnInit } from '@angular/core';
import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'my-project';
  public user;
  message;
constructor(private messagingService: MessagingService) {
  
}
  public ngOnInit() {
    this.user ={
      username: 'Luke',
      email: 'Luke@skywalker.com',
    };
    
  }
}

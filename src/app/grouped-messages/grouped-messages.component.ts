import { Component, Input } from '@angular/core';
import { Message } from '../services/message.service';
import { MessageComponent } from '../message/message.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-grouped-messages',
  standalone: true,
  imports: [MessageComponent, CommonModule],
  templateUrl: './grouped-messages.component.html',
  styleUrl: './grouped-messages.component.scss'
})
export class GroupedMessagesComponent {
  @Input() groupedMessages!: Message[];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  myMessage(message: Message) {
    return message.author === this.authService.currentUser.id;
  }

  getAuthor() {
    const author = this.userService.getUser(this.groupedMessages[0].author);
    return author
  }

  getTime() {
    const lastMsg = this.groupedMessages[this.groupedMessages.length - 1];
    let date = new Date(lastMsg.created_at)
    
    return date
  }
}
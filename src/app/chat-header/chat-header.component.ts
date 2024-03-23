import { Component, Input } from '@angular/core';
import { Channel } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { publishFacade } from '@angular/compiler';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  @Input() currentChat!: Channel | Message;
  userImgArray: string[] = [];
  groupMemberCount: number = 0;

  constructor(
    private userService: UserService,
    public messageService: MessageService
  ) { }

  renderGroupMember() {
    this.userImgArray = [];
    this.groupMemberCount = 0;
    if ('is_channel' in this.currentChat && this.currentChat.is_channel === true) {
      this.currentChat.members.forEach((memberId) => {
        const userImg = this.userService.getUser(memberId).picture;
        if (this.userImgArray.length < 3){
          this.userImgArray.push(userImg);
        } else {
          this.groupMemberCount++;
        }
      })
      return this.userImgArray
    } else {
      return []
    }
  }

  isChannel() {
    return 'is_channel' in this.currentChat && this.currentChat.is_channel === true;
  }

  isThread() {
    return 'in_thread' in this.currentChat;
  }

  getName() {
    if ('is_channel' in this.currentChat && this.currentChat.is_channel === true) {
      return this.currentChat.name;
    } else if ('is_channel' in this.currentChat && this.currentChat.is_channel === false) {
      return this.userService.getInterlocutor(this.currentChat)?.name
    } else if ('in_thread' in this.currentChat) {
      return 'Thread'
    } else {
      return 'Select a Thread'
    }
  }

  getPicture() {
    if ('is_channel' in this.currentChat && this.currentChat.picture !== '') {
      return this.currentChat.picture;
    } else {
      return 'assets/img/profile_placeholder.svg'
    }
  }

  closeThread(){
    this.messageService.threadOpen = false;
  }
}
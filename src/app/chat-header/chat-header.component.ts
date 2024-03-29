import { Component, Input, OnInit } from '@angular/core';
import { Channel } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent implements OnInit {
  @Input() currentChat!: Channel | Message;
  userImgArray: string[] = [];
  groupMemberCount: number = 0;

  constructor(
    private userService: UserService,
    public messageService: MessageService,
    private mainService: MainService,
  ) { }
  ngOnInit(): void {
    this.renderGroupMember();
  }

  addMemberDialog() {
    this.mainService.showPopup = true;
    this.mainService.addMembersPopup = true;
  }

  showMemberDialog() {
    this.mainService.showPopup = true;
    this.mainService.showMembersPopup = true;
  }

  renderGroupMember() {
    // debugger;
    this.userImgArray = [];
    this.groupMemberCount = 0;
    if ('is_channel' in this.currentChat && this.currentChat.is_channel === true) {
      this.currentChat.members.forEach((memberId) => {
        const userImg = this.userService.getUser(memberId).picture;

        if (this.userImgArray.length < 3) {
          // if(userImg != null)
          this.userImgArray.push(userImg || 'assets/img/profile_placeholder.svg');
        } else {
          this.groupMemberCount++;
        }
      })
      //   return this.userImgArray;
      // } else {
      //   return []
      // }
    }
  }

  isChannel() {
    return 'is_channel' in this.currentChat && this.currentChat.is_channel === true;
  }

  isThread() {
    return 'reactions' in this.currentChat;
  }

  getName() {
    if ('is_channel' in this.currentChat && this.currentChat.is_channel === true) {
      return this.currentChat.name;
    } else if ('is_channel' in this.currentChat && this.currentChat.is_channel === false) {
      return this.userService.getInterlocutor(this.currentChat)?.name
    } else if ('reactions' in this.currentChat) {
      return 'Thread'
    } else {
      return 'Select a Thread'
    }
  }

  getPicture() {
    // debugger;
    if ('is_channel' in this.currentChat && this.currentChat.picture !== null) {
      return this.currentChat.picture;
    } else {
      return 'assets/img/profile_placeholder.svg'
    }
  }

  closeThread() {
    this.messageService.threadOpen = false;
  }
}
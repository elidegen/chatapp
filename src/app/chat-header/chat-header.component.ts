import { Component, Input, OnInit } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { MainService } from '../services/main.service';
import { environment } from '../../environments/environment.development';
import { CloseComponent } from '../svgs/close/close.component';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule, CloseComponent],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent implements OnInit {
  @Input() currentChat!: Channel | Message;
  userImgArray: string[] = [];
  groupMemberCount: number = 0;

  constructor(
    public userService: UserService,
    public messageService: MessageService,
    private mainService: MainService,
    public channelService: ChannelService
  ) { }

  ngOnInit(): void {
    this.renderGroupMember();
    this.channelService.renderGroupMember.subscribe(()=>{
      this.renderGroupMember();
    })
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
    this.userImgArray = [];
    this.groupMemberCount = 0;
    if ('is_channel' in this.currentChat && this.currentChat.is_channel === true) {
      this.currentChat.members.forEach((memberId) => {
        const userImg = this.userService.getUser(memberId).picture;

        if (this.userImgArray.length < 3) {
          this.userImgArray.push(this.channelService.getImg(userImg));
        } else {
          this.groupMemberCount++;
        }
      })
    }
  }

  isChannel() {
    return 'is_channel' in this.currentChat && this.currentChat.is_channel === true;
  }

  isMessage() {
    return 'reactions' in this.currentChat;
  }

  getName() {
    if ('is_channel' in this.currentChat && this.currentChat.is_channel === true) {
      return this.currentChat.name;
    } else if ('is_channel' in this.currentChat && this.currentChat.is_channel === false) {
      return this.userService.getInterlocutor(this.currentChat)?.username
    } else if ('reactions' in this.currentChat) {
      return 'Thread'
    } else {
      return 'Select a Thread'
    }
  }

  getPicture() {
    if ('is_channel' in this.currentChat && this.currentChat.picture !== null) {
      return this.channelService.getImg(this.currentChat.picture);
    } else if ('is_channel' in this.currentChat && this.currentChat.is_channel === false) {
      const interloc = this.userService.getInterlocutor(this.currentChat);
      return this.channelService.getImg(interloc.picture);
    } else {
      return 'assets/img/profile_placeholder.svg'
    }
  }

  isOnline() {
    return this.userService.isOnline(this.currentChat as Channel);
  }

  openChannelDetails() {
    this.mainService.showPopup = true;
    this.mainService.editChannelPopup = true;
  }
}
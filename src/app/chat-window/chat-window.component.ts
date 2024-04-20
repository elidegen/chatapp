import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageBarComponent } from '../message-bar/message-bar.component';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { GroupedMessagesComponent } from '../grouped-messages/grouped-messages.component';
import { MainService } from '../services/main.service';
import { SearchComponent } from '../search/search.component';
import { User } from '../services/user.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FormsModule, MessageBarComponent, ChatHeaderComponent, GroupedMessagesComponent, SearchComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit {
  @Input() channelToDisplay!: Channel;
  @ViewChild('chatWrapper') chatWrapper!: any;
  messagesToDisplay: Message[] = [];

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
    public mainService: MainService,
  ) {
    this.getMessagesToDisplay();
    this.channelService.scrollToBottom.subscribe(() => {
      // this.scrollToBottom();
      // this.scrollToElement();
    })
  }

  // scrollToElement(){

  // }

  scrollToBottom() {
    this.chatWrapper.nativeElement.scrollTop = this.chatWrapper.nativeElement.scrollHeight;
  }

  getMessagesToDisplay() {
    this.messagesToDisplay = this.messageService.currentMessages;
  }

  selectUser($event: User[]) {
    const user = $event[0];
    if (user.id === this.authService.currentUser.id) {
      this.dmWithSelf();
    } else {
      this.channelService.selectDirectMessage(user);
    }
  }

  dmWithSelf() {
    if (this.currentUserDmAlreadyExist()) {
      const channel = this.channelService.directMessages.find(obj => obj.members.length === 1 && obj.members.includes(this.authService.currentUser.id))!.id;
      this.channelService.openChannel(channel);
    } else {
      this.channelService.createDmWithUser(this.authService.currentUser.id);
    }
  }

  currentUserDmAlreadyExist() {
    return this.channelService.directMessages.some(obj => obj.members.length === 1 && obj.members.includes(this.authService.currentUser.id));
  }

  ngOnInit(): void {
    this.startPollingIntervals();
  }

  startPollingIntervals() {
    if (this.channelService.currentChannel.id) {
      this.channelService.startPollingForMessages(this.channelService.currentChannel.id);
    }
    this.channelService.startPolloingForChats();
  }

}
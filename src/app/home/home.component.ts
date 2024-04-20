import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MainService } from '../services/main.service';
import { ThreadWindowComponent } from '../thread-window/thread-window.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ThreadWindowComponent, ChatWindowComponent, FormsModule, SideMenuComponent, CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: CurrentUser;
  threadOpen: boolean = false;

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public mainService: MainService,
    public authService: AuthService,
  ) {
    this.currentUser = authService.currentUser;
  }

  ngOnInit(): void {
    this.startPollingIntervals();
  }

  ngOnDestroy(): void {
    this.stopPollingIntervals
  }

  startPollingIntervals() {
    this.channelService.startPollingForMessages(this.channelService.currentChannel.id);
    this.channelService.startPolloingForChats();
  }

  stopPollingIntervals(){
    this.channelService.stopPollingForMessages();
    this.channelService.stopPollingForChats();
  }


}
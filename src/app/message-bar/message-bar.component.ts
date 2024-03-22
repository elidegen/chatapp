import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel, ChannelService } from '../services/channel.service';
import { AuthService } from '../services/auth.service';
import { Message, MessageService } from '../services/message.service';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-bar',
  standalone: true,
  imports: [FormsModule, EmojiPickerComponent, CommonModule],
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.scss'
})
export class MessageBarComponent {
  @Input() currentChat: Channel | Message | undefined;
  inputContent: string = '';

  constructor(
    private channelService: ChannelService,
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  sendMsg() {    
    if (this.inputContent.trim()) {
      let newMessage: Message = {
        id: 0,
        author: this.authService.currentUser.id,
        reactions: [],
        in_thread: this.channelService.currentChannel.is_channel,
        source: this.currentChat!.id,
        content: this.inputContent,
        created_at: new Date()
      }
      this.messageService.messages.push(newMessage); //send newMessage to backend

      this.inputContent = '';
    }
  }
}
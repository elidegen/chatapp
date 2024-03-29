import { Component, Input } from '@angular/core';
import { Message, MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';
import { UserService } from '../services/user.service';
import { ReactionsComponent } from '../reactions/reactions.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, EmojiPickerComponent, ReactionsComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() myMessage!: boolean;
  currentUser: CurrentUser;
  showEmojiPicker: boolean = false;
  allReactions: any[] = [];
  reactionsPreview: any[] = [];
  expandReaction: boolean = true;
  editState: boolean = false;

  addedReaction: Subject<void> = new Subject<void>();

  constructor(
    public authService: AuthService,
    public messageService: MessageService,
    public userService: UserService,
  ) {
    this.currentUser = authService.currentUser;
    this.setupClickListener();
  }

  thread() {
    const threadMsg = this.messageService.messages.find(obj => obj.source === this.message.id)
    return threadMsg != undefined;
  }

  private setupClickListener() {
    document.addEventListener('click', () => {
      this.showEmojiPicker = false;
    });
  }

  openEmojiPicker() {
    setTimeout(() => {
      this.showEmojiPicker = true;
    }, 1);
  }

  addReaction(character: string) {
    const index = this.messageService.messages.findIndex(obj => obj === this.message);
    const reaction = {
      user: this.currentUser.id,
      emoji: character,
    };
    if (this.message.reactions.some(obj => obj.emoji === reaction.emoji && obj.user === reaction.user)) {
      const reactionIndex = this.message.reactions.findIndex(obj => obj.emoji === reaction.emoji && obj.user === reaction.user)
      this.message.reactions.splice(reactionIndex, 1);
    } else {
      this.message.reactions.push(reaction);
    }
    this.messageService.messages[index] = this.message;
    this.addedReaction.next();
  }

  getCharater($event: any) {
    return $event.character
  }

  sourceIsChannel() {
    return !this.messageService.getMessage(this.message.source)
  }

  deleteMessage() {
    const index = this.messageService.messages.findIndex(obj => obj.id === this.message.id);
    this.messageService.messages.splice(index, 1);
  }

  editMessage() {
    this.editState = true
  }
}
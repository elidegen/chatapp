import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { NewChannelDialogComponent } from '../new-channel-dialog/new-channel-dialog.component';
import { ProfileComponent } from '../profile/profile.component';
import { AddMembersDialogComponent } from '../add-members-dialog/add-members-dialog.component';
import { ShowMembersDialogComponent } from '../show-members-dialog/show-members-dialog.component';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, NewChannelDialogComponent, ProfileComponent, AddMembersDialogComponent, ShowMembersDialogComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  constructor(
    public mainService: MainService
  ) { }
}

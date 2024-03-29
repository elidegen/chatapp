import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  showPopup: boolean = false;
  errorMessage: string | undefined;
  loader: boolean = false;
  addChannelPopup: boolean = false;
  profilePopup: boolean = false;
  addMembersPopup: boolean = false;
  showMembersPopup: boolean = false;
  sideMenuOpen: boolean = true;
  showEmojiPicker: 'thread' | 'chat' | 'reaction' | undefined;
  allEmojis: Array<any> = [];
  categoryList: Array<any> = [];
  emojiUrl:string = 'https://emoji-api.com/emojis?access_key=a3f490babea502cd547755934800ad65f1dd5f65';
  categoryUrl: string = 'https://emoji-api.com/categories?access_key=a3f490babea502cd547755934800ad65f1dd5f65';

  constructor() {
    this.getEmojis();
  }

  /**
  * Fetches emojis from the API.
  */
  getEmojis() {
    fetch(this.emojiUrl)
      .then(res => res.json())
      .then(data => this.loadEmoji(data));

    fetch(this.categoryUrl)
      .then(res => res.json())
      .then(data => this.loadCategorys(data));
  }

  /**
  * Loads emojis from the API response into the emojiList and allEmojis arrays.
  * @param {[]} data - The data containing emojis from the API response.
  */
  loadEmoji(data: []) {
    data.forEach(emoji => {
      this.allEmojis.push(emoji);
    });
  }

  loadCategorys(data: []) {
    data.forEach(category => {
      this.categoryList.push(category);
    });
  }

  closePopups() {
    this.showPopup = false;
    this.errorMessage = undefined;
    this.addChannelPopup = false;
    this.profilePopup = false;
    this.addMembersPopup = false;
    this.showMembersPopup = false;
  }

  openPopup() {
    this.showPopup = true;
  }

  errorLog(message: string) {
    this.openPopup();
    this.errorMessage = message;
    setTimeout(() => {
      this.closePopups();
    }, 3000);
  }
}
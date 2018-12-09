import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  isSpinning = true;
  messages: any = [];
  totalPages;
  page = 1;
  limit = 10;
  constructor(public _store: StoreService, public _messageServive: NzMessageService) { }

  ngOnInit() {
    this.getMessages();
  }
  getMessages(pageNo = this.page, limit = this.limit) {
    this.isSpinning = true;
    this._store.getMessages(pageNo, limit).subscribe((data) => {
      this.messages = data['objects'];
      this.totalPages = Math.ceil(data['meta']['total'] / this.limit);
      this.isSpinning = false;
    }, error => {
      console.log(error);
      this.isSpinning = false;
      this._messageServive.create('error', `${error['message']}`);
    });
  }
  previousPage() {
    if (this.page === 1) {
      return;
    }
    this.page--;
    this.getMessages(this.page);
  }
  nextPage() {
    this.page++;
    this.getMessages(this.page);
  }
  getOTP(text) {
    const matchedArray = text.match(/(?!Hi. Your OTP is: )(\d{6})/);
    return matchedArray ? matchedArray[0] : 'NO OTP';
  }
}

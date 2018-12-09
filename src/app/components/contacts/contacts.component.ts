import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any = [];
  constructor(public _store: StoreService, public _messageService: NzMessageService) { }

  ngOnInit() {
    this._store.getContacts().subscribe((data) => {
      console.log(data);
      this.contacts = data || [];
    }, (error) => {
      console.log(error);
      this._messageService.create('error', `Something went wrong`);
    });
  }

}

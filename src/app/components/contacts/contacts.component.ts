import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any = [];
  constructor(public _store: StoreService) { }

  ngOnInit() {
    this._store.getContacts().subscribe((data) => {
      console.log(data);
      this.contacts = data || [];
    }, (error) => {
      console.log(error);
    });
  }

}

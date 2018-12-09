import { environment } from './../../../../environments/environment';
import { StoreService } from './../../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.css']
})
export class SingleContactComponent implements OnInit {
  contactInfo: any;
  isSpinning = true;
  isVisible = false;
  isLoading = false;
  errorMessage = '';
  textField = new FormControl(null, [Validators.required]);
  constructor(public _store: StoreService, public _messageService: NzMessageService,
    public _route: ActivatedRoute, public _router: Router) { }

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.fetchContact(params['id']);
      } else {
        this._router.navigate(['/contacts']);
      }
    });
  }
  async fetchContact(id) {
    try {
      const contacts: any = (await this._store.getContacts().toPromise()) || [];
      this.contactInfo = contacts.find(c => c._id === id);
      if (!this.contactInfo) {
        console.log('record not found');
      }
      this.isSpinning = false;
    } catch (e) {
      console.log(e);
      this.isSpinning = false;
    }
  }
  openModal() {
    this.isVisible = true;
    this.textField.reset();
  }
  async send() {
    this.errorMessage = '';
    try {
      this.textField.markAsDirty();
      if (this.textField.valid) {
        const text = `Hi. Your OTP is: ${Math.floor(100000 + Math.random() * 900000)} \n ${this.textField.value}`;
        await this._store.sendMessage({ message: text, to: this.contactInfo['phone'], from: environment.ADMIN_NUMBER }).toPromise();
        this.cancel();
        this.isLoading = false;
        this._router.navigate(['/messages']);
      }
    } catch (e) {
      console.log(e);
      this.isLoading = false;
      this._messageService.create('error', `Something went wrong`);

      this.errorMessage = e.message;
    }
  }
  cancel() {
    this.isVisible = false;
  }
}

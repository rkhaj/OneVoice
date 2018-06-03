import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { SpeechService } from '../speech.service';
// import { Words } from './../words';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
// declare var $: any;
import * as $ from 'jquery';
declare var voiceLib: any;
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
/**
 * This class will implement the login functionality and validates the user credential.
 */
export class LoginFormComponent implements OnInit, OnDestroy {
  userEntered: Boolean = false;
  passEntered: Boolean = false;
  clickSub: Subscription;
  focusSub: Subscription;
  focused: boolean;
  focus: string;
  id: any;
  errorsSub: Subscription;
  errorMsg: string;
  enter: string;
  entrySub: Subscription;

  constructor(
    public speech: SpeechService,
    public router: Router
  ) { }

  ngOnInit() {
    this.speech.textToSpeech('Welcome to one housing application');
    this.speech.textToSpeech('Please enter your credentials to login');
    this.speech.startListening();
    this.speech.init();
    this._listenFocusCall();
    this._listenClickValue();
    this.id = '';
  }

  private _listenFocusCall() {
    this.focusSub = this.speech.words$
      .filter(obj => obj.type === 'focus')
      .map(focusObj => focusObj.word)
      .subscribe(
        focus => {
          this._setError();
          document.getElementById(`${focus}`).focus();
          this.id = focus;
          this._listenEnterValue();
        }
      );
  }

  private _listenEnterValue() {
    if (this.id) {
    this.entrySub = this.speech.words$
      .filter(obj => obj.type === 'enter')
      .map(entryObj => entryObj.word)
      .subscribe(
        entry => {
          (<HTMLInputElement>document.getElementById(this.id)).value = entry;
          if (this.id === 'password') {
            this.passEntered = true;
            this.speech.textToSpeech(`The password has been entered`);
          } else {
            this.userEntered = true;
            this.speech.textToSpeech(`The entered field value is ${entry}`);
          }
        }
      );
    }
  }

  private _listenClickValue() {
    this.clickSub = this.speech.words$
      .filter(obj => obj.type === 'click')
      .map(clickObj => clickObj.word)
      .subscribe(
        click => {
          this._setError();
          if (click === 'login') {
            if (this.passEntered && this.userEntered) {
              this.speech.textToSpeech('Login successful');
              this.speech.textToSpeech('Navigating to Repair Stage create form');
              this.router.navigate(['create_stages']);
            } else {
              if (!this.passEntered) {
                this.speech.textToSpeech('Please enter password');
              } else if (!this.userEntered) {
                this.speech.textToSpeech('Please enter username');
              } else {
                this.speech.textToSpeech('Please enter the valid login credentials');
              }
            }
          }
        }
      );
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  public listenSpeaker() {
    if (this.speech.listening) {
      this.speech.abort();
    } else {
      this.speech.startListening();
    }
  }

  ngOnDestroy() {
    // this.focusSub.unsubscribe();
    // this.entrySub.unsubscribe();
    // this.errorsSub.unsubscribe();
    // // this.clickSub.unsubscribe();
  }

}

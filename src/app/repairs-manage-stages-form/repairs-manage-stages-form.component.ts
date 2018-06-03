import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {OneVoiceService } from '../one-voice.service';
import { SpeechService } from '../speech.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'repairs-manage-stages-form',
  templateUrl: './repairs-manage-stages-form.component.html',
  styleUrls: ['./repairs-manage-stages-form.component.scss']
})
export class RepairsManageStagesFormComponent implements OnInit {

  formSub: Subscription;
  clickSub: Subscription;
  opened: boolean;
  addSub: Subscription;
  tickSub: Subscription;
  untickSub: Subscription;
  id: any;
  enteringSub: Subscription;
  focused: boolean;
  focus: string;
  focusingSub: Subscription;
  arrayFull: string;
  errorsSub: Subscription;
  errorMsg: string;
  enter: string;
  constructor(
    private router: Router,
    public speech: SpeechService,
    private ml: OneVoiceService
  ) { }

  ngOnInit() {
    // this.speech.startListening();
    this.speech.init();
    this._listenFocusCall();
    this._tickCheckBox();
    this._uncheckBox();
    this._listenAddCommand();
    this._listenClickValue();
    this._listenFormCommands();
  }


  // public Create() {
  //   this.speech.textToSpeech('Create button clicked');
  //   // this.speech.textToSpeech('Navigating to Repair Stage create form');
  //   // this.router.navigate(['repairstage']);
  // }
  private _listenFocusCall() {
    this.focusingSub = this.speech.words$
      .filter(obj => obj.type === 'focus')
      .map(focusObj => focusObj.word)
      .subscribe(
        focus => {
          this._setError();
          document.getElementById(`${focus}`).focus();
          this.id = focus;
          this._checkForValue();
        }
      );
  }
  private _checkForValue() {
    if (this.id) {
      this.enteringSub = this.speech.words$
        .filter(obj => obj.type === 'enter')
        .map(entryObj => entryObj.word)
        .subscribe(
          entry => {
            if (entry && this.id) {
              (<HTMLInputElement>document.getElementById(this.id)).value = entry;
              this.speech.textToSpeech(`The entered field value is ${entry}`);
            }
          }
        );
    }
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _uncheckBox() {
    this.untickSub = this.speech.words$
    .filter(obj => obj.type === 'uncheck')
    .map(tickObj => tickObj.word)
    .subscribe(
      untick => {
        console.log(untick);
        (<HTMLInputElement>document.getElementById(`${untick}`)).checked = false;
        this.speech.textToSpeech(`${untick} has been unchecked`);
      } );
  }

  private _tickCheckBox() {
    this.tickSub = this.speech.words$
    .filter(obj => obj.type === 'check')
    .map(tickObj => tickObj.word)
    .subscribe(
      tick => {
        console.log(tick);
        (<HTMLInputElement>document.getElementById(`${tick}`)).checked = true;
        this.speech.textToSpeech(`${tick} has been checked`);
      } );
  }

  private _listenAddCommand() {
    this.addSub = this.speech.words$
      .filter(obj => obj.type === 'add')
      .map(addObj => addObj.word)
      .subscribe(
        add => {
          this._setError();
          if (add === 'checklist') {
            // document.getElementById(`${focus}`).focus();
            this.opened = true;
            this.speech.textToSpeech(`Here is a checklist for you`);
          }
        }
      );
  }

  private _listenClickValue() {
    this.clickSub = this.speech.words$
      .filter(obj => obj.type === 'click')
      .map(clickObj => clickObj.word)
      .subscribe(
        click => {
          this._setError();
          if (click === 'close') {
           this.opened = false;
           this.speech.textToSpeech(`Checklist has been closed`);
          }
        }
      );
  }

  private _listenFormCommands() {
    this.formSub = this.speech.words$
      .filter(obj => obj.type === 'form')
      .map(formObj => formObj.word)
      .subscribe(
        form => {
          this._setError();
          if (form === 'submit') {
            this.speech.textToSpeech(`form has been submitted`);
          } else if (form === 'cancel') {
            this.speech.textToSpeech(`form has been cancelled routing back to login page`);
            this.router.navigate(['login']);
          }
        }
      );
  }

}

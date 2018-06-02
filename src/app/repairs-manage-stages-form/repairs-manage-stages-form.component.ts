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

  tickSub: Subscription;
  untickSub: Subscription;
  id: any;
  entrySub: Subscription;
  focused: boolean;
  focus: string;
  focusSub: Subscription;
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
    this.speech.init();
    this._listenFocusCall();
    this._checkForValue();
    this._tickCheckBox();
    this._uncheckBox();
  }


  public Create() {
    this.speech.textToSpeech('Create button clicked');
    // this.speech.textToSpeech('Navigating to Repair Stage create form');
    // this.router.navigate(['repairstage']);
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
          this._checkForValue();
        }
      );
  }
  private _checkForValue() {
    if (this.id) {
      this.entrySub = this.speech.words$
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
    .filter(obj => obj.type === 'remove')
    .map(tickObj => tickObj.word)
    .subscribe(
      untick => {
        console.log(untick);
        (<HTMLInputElement>document.getElementById(`${untick}`)).checked = false;
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
      } );
  }


}

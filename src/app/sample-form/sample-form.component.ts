import { Component, OnInit, OnDestroy } from '@angular/core';
import { Words } from './../words';
import { SpeechService } from './../speech.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss']
})
export class SampleFormComponent implements OnInit, OnDestroy {

  id: any;
  entrySub: Subscription;
  focused: boolean;
  focus: string;
  focusSub: Subscription;
  arrayFull: string;
  errorsSub: Subscription;
  errorMsg: string;
  enter: string;

  constructor(public speech: SpeechService) { }

  ngOnInit() {
    this.speech.init();
    this._listenFocusCall();
    this._checkForValue();
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
    console.log(this.id);
    if (this.id) {
      // alert('inside');
    this.entrySub = this.speech.words$
      .filter(obj => obj.type === 'enter')
      .map(entryObj => entryObj.word)
      .subscribe(
        entry => {
          if (entry === 'date' && this.id === 'date') {
            const currDate = '31-05-2018';
            (<HTMLInputElement>document.getElementById(this.id)).value = entry;
          } else {
            if (entry && this.id) {
              (<HTMLInputElement>document.getElementById(this.id)).value = entry;
            } else if (entry && this.id === '') {
              // alert('please select a field first');
            } else if (this.id &&  entry === '') {
              // alert('please enter a value to input');
            }
          }
        }
      );
      } else {
        // alert('please select a field first');
      }
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


  ngOnDestroy() {
    this.focusSub.unsubscribe();
    this.errorsSub.unsubscribe();
  }

}

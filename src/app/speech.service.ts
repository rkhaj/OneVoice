import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// TypeScript declaration for annyang
declare var annyang: any;
declare var $: any;

@Injectable()
export class SpeechService {
  words$ = new Subject<{[key: string]: string}>();
  errors$ = new Subject<{[key: string]: any}>();
  listening = false;

  constructor(
    private zone: NgZone
  )  {}

  textToSpeech(text) {
    const message1 = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    message1.voice = voices[0];
    speechSynthesis.speak(message1);
  }


  get speechSupported(): boolean {
    return !!annyang;
  }

  startListening() {
    console.log('lsitening');
    annyang.setLanguage('en-IN');
    annyang.start();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }

  sleep() {
    annyang.pause();
  }

  wakeUp() {
    annyang.resume();
  }

  init() {
    const commands = {
      'noun :noun': (noun) => {
        this.zone.run(() => {
          this.words$.next({type: 'noun', 'word': noun});
        });
      },
      'verb :verb': (verb) => {
        this.zone.run(() => {
          this.words$.next({type: 'verb', 'word': verb});
        });
      },
      'adjective :adj': (adj) => {
        this.zone.run(() => {
          this.words$.next({type: 'adj', 'word': adj});
        });
      },
      'focus :focus': (focus) => {
        this.zone.run(() => {
          this.words$.next({type: 'focus', 'word': focus});
        });
      },
      'stop listen': (pause) => {
        console.log('paused');
        this.abort();
      },
      'enter :enter': (enter) => {
        this.zone.run(() => {
          setTimeout(() => this.words$.next({type: 'enter', 'word': enter}));
        });
      },
      'add :add': (add) => {
        this.zone.run(() => {
          this.words$.next({type: 'add', 'word': add});
        });
      },
      'check :check': (check) => {
        this.zone.run(() => {
          this.words$.next({type: 'check', 'word': check});
        });
      },
      'uncheck :uncheck': (uncheck) => {
        this.zone.run(() => {
          this.words$.next({type: 'uncheck', 'word': uncheck});
        });
      },
      'show :show': (show) => {
        this.zone.run(() => {
          this.words$.next({type: 'show', 'word': show});
        });
      },
      'select :select': (select) => {
        this.zone.run(() => {
          this.words$.next({type: 'select', 'word': select});
        });
      },
      'form :form': (form) => {
        this.zone.run(() => {
          this.words$.next({type: 'form', 'word': form});
        });
      },
      'click :click': (click) => {
        this.zone.run(() => {
          this.words$.next({type: 'click', 'word': click});
        });
      },
      'scroll :move': (move) => {
        this.zone.run(() => {
          switch (move) {
            case 'top':
              window.scrollBy(0, -572);
              break;
            case 'down':
              window.scrollBy(0, 572);
              break;
            case 'right':
              window.scrollBy(200, 0);
              break;
            case 'left':
              window.scrollBy(-200, 0);
              break;
          }
        });
      }

    };
    annyang.addCommands(commands);
    annyang.debug();

    // Log anything the user says and what speech recognition thinks it might be
    // annyang.addCallback('result', (userSaid) => {
    //   console.log('User may have said:', userSaid);
    // });
    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred.', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. Say "noun [word]", "verb [word]", OR "adjective [word]".',
        { results: userSaid });
    });
  }

  private _handleError(error, msg, errObj) {
    this.zone.run(() => {
      this.errors$.next({
        error: error,
        message: msg,
        obj: errObj
      });
    });
  }


}

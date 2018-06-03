import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { OneHousingMenuComponent } from '../one-housing-menu/one-housing-menu.component';
import { Subscription } from 'rxjs/Subscription';
import { SpeechService } from '../speech.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  errorsSub: Subscription;
  errorMsg: any;
  public imagePath = '';
  public country = '';
  @ViewChild(OneHousingMenuComponent) megaMenu: OneHousingMenuComponent;
  private subscription: Subscription;

  constructor( public speech: SpeechService) {
    // this.imagePath = imageUrl;private router: Router,
  }

  ngOnInit() {
    // this.speech.startListening();
    this.speech.init();
    this.country = '../../../assets/images/en.png';
  }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }

  public listenSpeaker() {
    if (this.speech.listening) {
      this.speech.abort();
    } else {
      this.speech.startListening();
    }
  }

}

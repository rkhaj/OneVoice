import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OneHousingMenuComponent } from './one-housing-menu/one-housing-menu.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RepairsManageStagesFormComponent } from './repairs-manage-stages-form/repairs-manage-stages-form.component';
import { SpeechService } from './speech.service';
import { AppRouting } from './one-voice.router';
import { OneVoiceService } from './one-voice.service';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OneHousingMenuComponent,
    LoginFormComponent,
    RepairsManageStagesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRouting ,
    HttpModule ,
    HttpClientModule
  ],
  providers: [SpeechService , OneVoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

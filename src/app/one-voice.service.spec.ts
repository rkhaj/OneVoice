import { TestBed, inject } from '@angular/core/testing';

import { OneVoiceService } from './one-voice.service';

describe('OneVoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OneVoiceService]
    });
  });

  it('should be created', inject([OneVoiceService], (service: OneVoiceService) => {
    expect(service).toBeTruthy();
  }));
});

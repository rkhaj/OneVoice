import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneHousingMenuComponent } from './one-housing-menu.component';

describe('OneHousingMenuComponent', () => {
  let component: OneHousingMenuComponent;
  let fixture: ComponentFixture<OneHousingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneHousingMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneHousingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

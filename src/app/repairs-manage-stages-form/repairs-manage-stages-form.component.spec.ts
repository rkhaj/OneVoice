import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsManageStagesFormComponent } from './repairs-manage-stages-form.component';

describe('RepairsManageStagesFormComponent', () => {
  let component: RepairsManageStagesFormComponent;
  let fixture: ComponentFixture<RepairsManageStagesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairsManageStagesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairsManageStagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

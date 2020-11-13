import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerlicenseComponent } from './learnerlicense.component';

describe('LearnerlicenseComponent', () => {
  let component: LearnerlicenseComponent;
  let fixture: ComponentFixture<LearnerlicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerlicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivinglicenseComponent } from './drivinglicense.component';

describe('DrivinglicenseComponent', () => {
  let component: DrivinglicenseComponent;
  let fixture: ComponentFixture<DrivinglicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivinglicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivinglicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

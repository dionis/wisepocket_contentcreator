import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewWYesNoComponent } from './dialog-overview-wyes_no.component';

describe('DialogOverviewWYesNoComponent', () => {
  let component: DialogOverviewWYesNoComponent;
  let fixture: ComponentFixture<DialogOverviewWYesNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOverviewWYesNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverviewYesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

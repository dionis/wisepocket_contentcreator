import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewYesNoComponent } from './dialog-overview-yes_no.component';

describe('DialogOverviewYesNoComponent', () => {
  let component: DialogOverviewYesNoComponent;
  let fixture: ComponentFixture<DialogOverviewYesNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOverviewYesNoComponent ]
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

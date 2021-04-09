import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewErrorDialogComponent } from './dialog-overview-error-dialog.component';

describe('DialogOverviewErrorDialogComponent', () => {
  let component: DialogOverviewErrorDialogComponent;
  let fixture: ComponentFixture<DialogOverviewErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOverviewErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverviewErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

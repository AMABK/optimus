import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsDialogComponent } from './permissions-dialog.component';

describe('PermisionsDialogComponent', () => {
  let component: PermissionsDialogComponent;
  let fixture: ComponentFixture<PermissionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupDetailsComponent } from './add-group-details.component';

describe('AddGroupDetailsComponent', () => {
  let component: AddGroupDetailsComponent;
  let fixture: ComponentFixture<AddGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

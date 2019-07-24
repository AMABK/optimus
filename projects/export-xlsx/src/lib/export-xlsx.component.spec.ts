import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportXlsxComponent } from './export-xlsx.component';

describe('ExportXlsxComponent', () => {
  let component: ExportXlsxComponent;
  let fixture: ComponentFixture<ExportXlsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportXlsxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

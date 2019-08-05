import { TestBed } from '@angular/core/testing';

import { ExportXlsxService } from './export-xlsx.service';

describe('ExportXlsxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportXlsxService = TestBed.get(ExportXlsxService);
    expect(service).toBeTruthy();
  });
});

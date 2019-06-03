import { TestBed } from '@angular/core/testing';

import { ExportPdfService } from './export-pdf.service';

describe('ExportPdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportPdfService = TestBed.get(ExportPdfService);
    expect(service).toBeTruthy();
  });
});

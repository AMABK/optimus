import { TestBed } from '@angular/core/testing';

import { ChamaService } from './chama.service';

describe('ChamaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChamaService = TestBed.get(ChamaService);
    expect(service).toBeTruthy();
  });
});

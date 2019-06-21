import { TestBed } from '@angular/core/testing';

import { DebitService } from './debit.service';

describe('DebitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebitService = TestBed.get(DebitService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DynamicTreeService } from './dynamic-tree.service';

describe('DynamicTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicTreeService = TestBed.get(DynamicTreeService);
    expect(service).toBeTruthy();
  });
});

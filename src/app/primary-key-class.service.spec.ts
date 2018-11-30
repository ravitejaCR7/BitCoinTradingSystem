import { TestBed } from '@angular/core/testing';

import { PrimaryKeyClassService } from './primary-key-class.service';

describe('PrimaryKeyClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimaryKeyClassService = TestBed.get(PrimaryKeyClassService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FbmethodsService } from './fbmethods.service';

describe('FbmethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbmethodsService = TestBed.get(FbmethodsService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CmbService } from './cmb.service';

describe('CmbService', () => {
  let service: CmbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

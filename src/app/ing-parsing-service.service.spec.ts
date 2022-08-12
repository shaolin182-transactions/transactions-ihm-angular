import { TestBed } from '@angular/core/testing';

import { IngParsingServiceService } from './ing-parsing-service.service';

describe('IngParsingServiceService', () => {
  let service: IngParsingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngParsingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

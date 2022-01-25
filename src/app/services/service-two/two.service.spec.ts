import { TestBed } from '@angular/core/testing';

import { TwoService } from './two.service';

describe('TwoService', () => {
  let service: TwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

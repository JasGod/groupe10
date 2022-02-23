import { TestBed } from '@angular/core/testing';

import { PopinaService } from './popina.service';

describe('PopinaService', () => {
  let service: PopinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

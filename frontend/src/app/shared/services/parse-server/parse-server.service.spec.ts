import { TestBed } from '@angular/core/testing';

import { ParseServerService } from './parse-server.service';

describe('ParseServerService', () => {
  let service: ParseServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

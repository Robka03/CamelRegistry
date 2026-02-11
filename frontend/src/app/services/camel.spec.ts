import { TestBed } from '@angular/core/testing';

import { Camel } from './camel';

describe('Camel', () => {
  let service: Camel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Camel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

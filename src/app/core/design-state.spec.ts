import { TestBed } from '@angular/core/testing';
import { DesignState } from './design-state';

describe('DesignState', () => {
  let service: DesignState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

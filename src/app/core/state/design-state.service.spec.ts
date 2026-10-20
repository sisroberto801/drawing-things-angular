import { TestBed } from '@angular/core/testing';
import { DesignStateService } from './design-state.service';

describe('DesignStateService', () => {
  let service: DesignStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

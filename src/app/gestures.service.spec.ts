import { TestBed } from '@angular/core/testing';

import { GesturesService } from './gestures.service';

describe('GesturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GesturesService = TestBed.get(GesturesService);
    expect(service).toBeTruthy();
  });
});

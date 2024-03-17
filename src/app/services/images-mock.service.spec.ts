import { TestBed } from '@angular/core/testing';

import { ImagesMockService } from './images-mock.service';

describe('ImagesMockService', () => {
  let service: ImagesMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

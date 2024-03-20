import { TestBed } from '@angular/core/testing';

import { DialogExpandedImageService } from './dialog-expanded-image.service';

describe('DialogExpandedImageService', () => {
  let service: DialogExpandedImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogExpandedImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ModalExpandedImageService } from './modal-expanded-image.service';

describe('ModalExpandedImageService', () => {
  let service: ModalExpandedImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalExpandedImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

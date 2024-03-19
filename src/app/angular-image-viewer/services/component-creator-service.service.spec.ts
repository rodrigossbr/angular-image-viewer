import { TestBed } from '@angular/core/testing';

import { ComponentCreatorServiceService } from './component-creator-service.service';

describe('ComponentCreatorServiceService', () => {
  let service: ComponentCreatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentCreatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

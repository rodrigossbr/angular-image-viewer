import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExpandedImageComponent } from './modal-expanded-image.component';

describe('ModalExpandedImageComponent', () => {
  let component: ModalExpandedImageComponent;
  let fixture: ComponentFixture<ModalExpandedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExpandedImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalExpandedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

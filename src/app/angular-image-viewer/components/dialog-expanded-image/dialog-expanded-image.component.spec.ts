import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExpandedImageComponent } from './dialog-expanded-image.component';

describe('ModalExpandedImageComponent', () => {
  let component: DialogExpandedImageComponent;
  let fixture: ComponentFixture<DialogExpandedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogExpandedImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExpandedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

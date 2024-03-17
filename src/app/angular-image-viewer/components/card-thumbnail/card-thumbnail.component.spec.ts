import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardThumbnailComponent } from './card-thumbnail.component';

describe('CardThumbnailComponent', () => {
  let component: CardThumbnailComponent;
  let fixture: ComponentFixture<CardThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

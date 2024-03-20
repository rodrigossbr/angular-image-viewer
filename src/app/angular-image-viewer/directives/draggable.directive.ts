import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  _disabled: boolean = false;

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;
  private defaultOffsetX = 0;
  private defaultOffsetY = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this.resetPosition();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {

    if (this.disabled) {
      return;
    }

    this.isDragging = true;
    this.offsetX = event.clientX - this.el.nativeElement.getBoundingClientRect().left;
    this.offsetY = event.clientY - this.el.nativeElement.getBoundingClientRect().top;

    if (!this.defaultOffsetX && !this.defaultOffsetY) {
      this.defaultOffsetX = this.offsetX;
      this.defaultOffsetY = this.offsetY;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging && !this.disabled) {
      this.renderer.setStyle(this.el.nativeElement, 'left', `${event.clientX - this.offsetX}px`);
      this.renderer.setStyle(this.el.nativeElement, 'top', `${event.clientY - this.offsetY}px`);
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }

  private resetPosition() {
    this.offsetX = 0;
    this.offsetY = 0;
    this.renderer.setStyle(this.el.nativeElement, 'left', `${this.defaultOffsetX}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${this.defaultOffsetY}px`);
    this.defaultOffsetX = 0;
    this.defaultOffsetY = 0;
  }
}

import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'zoom-controls',
  templateUrl: './zoom-controls.component.html',
  styleUrl: './zoom-controls.component.scss'
})
export class ZoomControlsComponent {

  @Output() public zoomChange = new EventEmitter<number>();
  @Output() public zoomReset = new EventEmitter();

  defaultScale: number = 100;
  scale: number = 100;
  scalePlus: number = 10;

  zoomIn() {
    this.updateScale(this.scale + this.scalePlus);
  }

  zoomOut() {
    if (this.scale > this.defaultScale) {
      this.updateScale(this.scale - this.scalePlus);
    }
  }

  zoomOff() {
    this.updateScale(this.defaultScale);
    this.zoomReset.emit();
  }

  private updateScale(scale: number) {
    this.scale = scale;
    this.zoomChange.emit(this.scale);
  }
}

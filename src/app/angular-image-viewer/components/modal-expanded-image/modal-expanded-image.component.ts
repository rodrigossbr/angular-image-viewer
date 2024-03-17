import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AngularImageViewer} from "../../models/angular-image-viewer.model";

@Component({
  selector: 'modal-expanded-image',
  templateUrl: './modal-expanded-image.component.html',
  styleUrl: './modal-expanded-image.component.scss'
})
export class ModalExpandedImageComponent implements OnInit {

  @Input() public image?: AngularImageViewer;
  @Input() public images: Array<AngularImageViewer> = [];

  @Output() public close = new EventEmitter();

  public scale: number = 100;
  public clientX: number = 0;
  public clientY: number = 0;
  public onDragMode: boolean = false;

  private innerWidth: number = 0;
  private innerHeight: number = 0;

  ngOnInit(): void {
    this.updateSizes();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateSizes();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

  }

  get imageWidth() {
    return `${this.innerWidth}px`;
  }

  get imageHeight() {
    return `${this.innerHeight}px`;
  }

  closeModal() {
    this.image = undefined;
  }

  leftImage() {
    const actualIndex = this.images.indexOf(this.image as AngularImageViewer);
    this.image = this.images[actualIndex - 1]
      ? this.images[actualIndex - 1]
      : this.images[this.images.length - 1];
  }

  rightImage() {
    const actualIndex = this.images.indexOf(this.image as AngularImageViewer);
    this.image = this.images[actualIndex + 1]
      ? this.images[actualIndex + 1]
      : this.images[0];
  }

  scaleChange(scale: number) {
    this.scale = scale;
  }

  private updateSizes() {
    this.innerWidth = window.innerWidth * 0.9;
    this.innerHeight = window.innerHeight * 0.9;
  }
}

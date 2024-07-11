import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AngularImageViewer} from '../../models/angular-image-viewer.model';
import {DialogExpandedImageService} from "../../services/dialog-expanded-image.service";

@Component({
  selector: 'dialog-expanded-image',
  templateUrl: './dialog-expanded-image.component.html',
  styleUrl: './dialog-expanded-image.component.scss'
})
export class DialogExpandedImageComponent implements OnInit {

  @Input() public image?: AngularImageViewer;
  @Input() public images: Array<AngularImageViewer> = [];

  @Output() public close = new EventEmitter();

  public scale: number = 100;

  protected imageWidth: number = 0;
  protected imageHeight: number = 0;

  constructor(private service: DialogExpandedImageService) {
  }

  ngOnInit(): void {
    this.updateSizes();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateSizes();
  }

  closeDialog() {
    this.service.closeDialog();
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

  isDraggable() {
    return this.scale > 100;
  }

  scaleChange(scale: number) {
    this.scale = scale;
    this.updateSizes();
  }

  showNavButtons() {
    return this.images.length > 1;
  }

  private updateSizes() {
    this.imageWidth = (window.innerWidth * 0.8);
    this.imageHeight = (window.innerHeight * 0.8);
  }
}

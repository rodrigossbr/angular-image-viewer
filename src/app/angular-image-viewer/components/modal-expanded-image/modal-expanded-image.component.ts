import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AngularImageViewer} from "../../models/angular-image-viewer.model";
import {ModalExpandedImageService} from "../../services/modal-expanded-image.service";

@Component({
  selector: 'modal-expanded-image',
  templateUrl: './modal-expanded-image.component.html',
  styleUrl: './modal-expanded-image.component.scss'
})
export class ModalExpandedImageComponent implements OnInit {

  @ViewChild('expandedImageDisplay')
  public expandedImageDisplay!: ElementRef;


  @Input() public image?: AngularImageViewer;
  @Input() public images: Array<AngularImageViewer> = [];

  @Output() public close = new EventEmitter();

  public scale: number = 100;
  public clientX: number = 0;
  public clientY: number = 0;
  public onDragMode: boolean = false;

  protected imageWidth: number = 0;
  protected imageHeight: number = 0;

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

    const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.expandedImageDisplay.nativeElement;

    // if (this.scale > 100) {
    //   this.clientX = offsetLeft;
    //   this.clientY = offsetTop;
    //   this.onDragMode = true;
    //   console.log('clientX, clientY', this.clientX, this.clientY)
    //
    // } else {
    //   this.onDragMode = false;
    // }
  }

  private updateSizes() {
    this.imageWidth = window.innerWidth * 0.9;
    this.imageHeight = window.innerHeight * 0.9;
  }

  mousemove(event: MouseEvent) {

    if (!this.onDragMode) {
      return;
    }



    this.clientX = event.clientX - (this.imageWidth / 2);
    this.clientY = event.clientY - (this.imageHeight / 2);

  }

  mouseup(event: MouseEvent) {

  }

  mousedown($event: MouseEvent) {

  }

  showNavButtons() {
    return this.images.length > 1;
  }
}

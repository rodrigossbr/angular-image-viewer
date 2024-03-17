import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AngularImageViewer} from '../../models/angular-image-viewer.model';

@Component({
  selector: 'angular-image-viewer',
  templateUrl: './angular-image-viewer.component.html',
  styleUrl: './angular-image-viewer.component.scss'
})
export class AngularImageViewerComponent implements OnInit {

  @ViewChild('mainImage')
  mainImage!: ElementRef;

  @Input()
  public images: Array<AngularImageViewer> = [];

  @Input()
  public zoomScale: number = 3;

  protected selectedImage!: AngularImageViewer;
  protected expandedImage?: AngularImageViewer;

  protected showCrop: boolean = false;
  protected cropSize: number = 200;
  protected cropPosX: number = 0;
  protected cropPosY: number = 0;

  protected showWindowZoom: boolean = false;
  protected windowZoomSize: number = 400;
  protected windowZoomPosX: number = 0;
  protected windowZoomPosY: number = 0;
  protected zoomImageWidth: number = 0;
  protected zoomImageHeight: number = 0;

  protected zoomImagePosX: number = 0;
  protected zoomImagePosY: number = 0;

  ngOnInit(): void {
    this.selectImage(this.images[0]);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.showCrop) {
      return;
    }
    this.setCropPosition(event.pageX, event.pageY);
    this.setZoomBackPosition();
  }

  mousemove(event: MouseEvent) {
    this.showCrop = true;
    this.showWindowZoom = true;
  }

  mouseleave(event: MouseEvent) {
    this.showCrop = false;
    this.showWindowZoom = false;
  }

  selectImage(image: AngularImageViewer) {
    this.selectedImage = image;

    this.windowZoomSize = this.cropSize * this.zoomScale;

    setTimeout(() => {
      this.setZoomCropPosition();
    }, 500);
  }

  clickMainImage() {
    this.expandedImage = this.selectedImage;
  }

  closeModal() {
    this.expandedImage = undefined;
  }

  private setCropPosition(pageX: number, pageY: number) {
    const { limitCrop, limitTop, limitBottom, limitLeft, limitRight } = this.getCropLimits();

    if ((pageY >= limitTop) && (pageY <= limitBottom)) {
      this.cropPosY = pageY - limitCrop;
    } else if (pageY < limitTop) {
      this.cropPosY = limitTop - limitCrop;
    } else if (pageY > limitBottom) {
      this.cropPosY = limitBottom - limitCrop;
    }

    if ((pageX >= limitLeft) && (pageX <= limitRight)) {
      this.cropPosX = pageX - limitCrop;
    } else if (pageX < limitLeft) {
      this.cropPosX = limitLeft - limitCrop;
    } else if (pageX > limitRight) {
      this.cropPosX = limitRight - limitCrop;
    }
  }

  private getCropLimits() {
    const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.mainImage.nativeElement;
    const limitCrop = this.cropSize / 2;
    return {
      limitCrop,
      limitTop: (offsetTop + limitCrop),
      limitLeft: (offsetLeft + limitCrop),
      limitRight: ((offsetLeft + (offsetWidth-2)) - limitCrop),
      limitBottom: ((offsetTop + offsetHeight-2) - limitCrop)
    };
  }

  private setZoomBackPosition() {
    this.zoomImagePosX = -((this.cropPosX * this.zoomScale) - (this.zoomImageWidth * 0.0965));
    this.zoomImagePosY = -((this.cropPosY * this.zoomScale) - (this.zoomImageHeight * 0.1));
  }

  private setZoomCropPosition() {
    const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.mainImage.nativeElement;
    this.windowZoomPosX = (offsetLeft + offsetWidth) + 6;
    this.windowZoomPosY = offsetTop;

    this.zoomImageWidth = offsetWidth * this.zoomScale;
    this.zoomImageHeight = offsetHeight * this.zoomScale;
  }
}


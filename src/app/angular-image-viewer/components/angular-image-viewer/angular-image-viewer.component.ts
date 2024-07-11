import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {AngularImageViewer} from '../../models/angular-image-viewer.model';
import {
  AngularImageViewerPerspective,
  availablePerspectives,
  AvailablePerspectivesTypes
} from '../../models/angular-image-viewer-perspective-enum';
import {DomUtils} from '../../utils/dom-utils';
import {DialogExpandedImageService} from '../../services/dialog-expanded-image.service';
import {ThumbnailTypeEnum} from "../../models/thumbnail-type.enum";


@Component({
  selector: 'angular-image-viewer',
  templateUrl: './angular-image-viewer.component.html',
  styleUrl: './angular-image-viewer.component.scss'
})
export class AngularImageViewerComponent {
  @ViewChild('mainImage')
  mainImage!: ElementRef;

  protected THUMBNAIL_LEFT = ThumbnailTypeEnum.LEFT;
  protected THUMBNAIL_RIGHT = ThumbnailTypeEnum.RIGHT;

  @Input() public thumbnail: ThumbnailTypeEnum | undefined;

  private _perspective: AvailablePerspectivesTypes = 'LARGE';
  private _images: Array<AngularImageViewer> = [];
  protected selectedImage!: AngularImageViewer;

  protected imageWidth!: number;
  protected imageHeight!: number;

  protected zoomScale: number = 3;
  protected showCrop: boolean = false;
  protected cropSize: number = 150;
  protected cropPosX: number = 0;
  protected cropPosY: number = 0;

  protected showWindowZoom: boolean = false;
  protected windowZoomSize: number = 300;
  protected windowZoomPosX: number = 0;
  protected windowZoomPosY: number = 0;
  protected zoomImageWidth: number = 0;
  protected zoomImageHeight: number = 0;

  protected zoomImagePosX: number = 0;
  protected zoomImagePosY: number = 0;

  constructor(private modalExpandedImageService: DialogExpandedImageService) { }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (!this.showCrop) {
      return;
    }

    this.setCropPosition(event.pageX, event.pageY);
    this.setZoomBackPosition();
  }

  @Input()
  public set images(images: Array<AngularImageViewer>) {
    this._images = images;
    this._images.length && this.selectImage(this.images[0]);
  }

  public get images() {
    return this._images;
  }

  @Input()
  public set perspective(value: AvailablePerspectivesTypes) {
    this._perspective = value;
    this.updatePerspective();
  }

  public get perspective(): AvailablePerspectivesTypes {
    return this._perspective;
  }

  protected mousemove(event: MouseEvent) {
    this.showCrop = true;
    this.showWindowZoom = true;
  }

  protected mouseleave(event: MouseEvent) {
    this.showCrop = false;
    this.showWindowZoom = false;
  }

  protected updatePerspective() {
    this.selectedImage && this.selectImage(this.selectedImage);
  }

  protected selectImage(image: AngularImageViewer) {

    const {cropSize, width, height} = this.getPerspective();

    this.imageWidth = width;
    this.imageHeight = height;
    this.cropSize = cropSize;
    this.windowZoomSize = this.cropSize * this.zoomScale;

    this.selectedImage = image;

    setTimeout(() => {
      this.setZoomCropPosition();
    }, 500);
  }

  protected clickMainImage() {
    this.modalExpandedImageService.showDialog({
      image: this.selectedImage,
      images: this.images
    })
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
    const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.getOffsets();

    const limitCrop = this.cropSize / 2;
    return {
      limitCrop,
      limitTop: (offsetTop + limitCrop),
      limitLeft: (offsetLeft + limitCrop),
      limitRight: ((offsetLeft + (offsetWidth - 2)) - limitCrop),
      limitBottom: ((offsetTop + (offsetHeight - 2)) - limitCrop)
    };
  }

  private setZoomBackPosition() {
    const {offsetLeft, offsetTop} = this.getOffsets();
    this.zoomImagePosX = -((this.cropPosX * this.zoomScale) - (offsetLeft * this.zoomScale));
    this.zoomImagePosY = -((this.cropPosY * this.zoomScale) - (offsetTop * this.zoomScale));
  }


  private setZoomCropPosition() {
    const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.getOffsets();
    this.windowZoomPosX = (offsetLeft + offsetWidth) + 6;
    this.windowZoomPosY = offsetTop;

    this.zoomImageWidth = offsetWidth * this.zoomScale;
    this.zoomImageHeight = offsetHeight * this.zoomScale;
  }

  private getPerspective(): AngularImageViewerPerspective {
    return availablePerspectives[this.perspective];
  }

  private getOffsets() {

    if (this.mainImage == null) {
      return {offsetLeft: 0, offsetTop: 0, offsetWidth: 0, offsetHeight: 0};
    }

    const {offsetLeft, offsetTop} = DomUtils.getOffset(this.mainImage.nativeElement);

    return {
      offsetLeft,
      offsetTop,
      offsetWidth: this.imageWidth,
      offsetHeight: this.imageHeight
    };
  }
}


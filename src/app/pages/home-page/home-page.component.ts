import {Component, OnInit} from '@angular/core';
import {ImagesMockService} from "../../services/images-mock.service";
import {AngularImageViewer} from "../../angular-image-viewer/models/angular-image-viewer.model";
import {AngularImageViewerModule} from "../../angular-image-viewer/angular-image-viewer.module";
import {FormsModule} from "@angular/forms";
import {AvailablePerspectivesTypes} from "../../angular-image-viewer/models/angular-image-viewer-perspective-enum";
import {ThumbnailTypeEnum} from "../../angular-image-viewer/models/thumbnail-type.enum";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    AngularImageViewerModule,
    FormsModule
  ],
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  protected THUMBNAIL_LEFT = ThumbnailTypeEnum.LEFT;
  protected THUMBNAIL_RIGHT = ThumbnailTypeEnum.RIGHT;

  protected images: Array<AngularImageViewer> = [];
  perspective: AvailablePerspectivesTypes = 'SMALL';
  thumbnail: ThumbnailTypeEnum = ThumbnailTypeEnum.RIGHT;

  constructor(private imagesService: ImagesMockService) {
  }

  ngOnInit(): void {
    this.imagesService.geImages()
      .subscribe(images => this.images = images);
  }
}

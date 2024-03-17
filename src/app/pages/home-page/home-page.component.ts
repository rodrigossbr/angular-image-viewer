import {Component, OnInit} from '@angular/core';
import {ImagesMockService} from "../../services/images-mock.service";
import {AngularImageViewer} from "../../angular-image-viewer/models/angular-image-viewer.model";
import {
  AngularImageViewerComponent
} from "../../angular-image-viewer/components/angular-image-viewer/angular-image-viewer.component";
import {AngularImageViewerModule} from "../../angular-image-viewer/angular-image-viewer.module";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    AngularImageViewerModule
  ],
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  protected images: Array<AngularImageViewer> = [];

  constructor(private imagesService: ImagesMockService) {
  }

  ngOnInit(): void {
    this.imagesService.geImages()
      .subscribe(images => this.images = images);
  }
}

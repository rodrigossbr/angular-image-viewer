import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AngularImageViewerComponent} from "./components/angular-image-viewer/angular-image-viewer.component";
import {CardThumbnailComponent} from "./components/card-thumbnail/card-thumbnail.component";
import {ModalExpandedImageComponent} from "./components/modal-expanded-image/modal-expanded-image.component";
import {ZoomControlsComponent} from "./components/zoom-controls/zoom-controls.component";
import {ComponentCreatorServiceService} from "./services/component-creator-service.service";
import {ModalExpandedImageService} from "./services/modal-expanded-image.service";



@NgModule({
  declarations: [
    AngularImageViewerComponent,
    CardThumbnailComponent,
    ModalExpandedImageComponent,
    ZoomControlsComponent
  ],
  exports: [
    AngularImageViewerComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  providers: [
    ComponentCreatorServiceService,
    ModalExpandedImageService
  ]
})
export class AngularImageViewerModule { }

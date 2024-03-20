import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AngularImageViewerComponent} from './components/angular-image-viewer/angular-image-viewer.component';
import {CardThumbnailComponent} from './components/card-thumbnail/card-thumbnail.component';
import {DialogExpandedImageComponent} from './components/dialog-expanded-image/dialog-expanded-image.component';
import {ZoomControlsComponent} from './components/zoom-controls/zoom-controls.component';
import {ComponentCreatorService} from './services/component-creator.service';
import {DialogExpandedImageService} from './services/dialog-expanded-image.service';
import {DraggableDirective} from "./directives/draggable.directive";



@NgModule({
  declarations: [
    AngularImageViewerComponent,
    CardThumbnailComponent,
    DialogExpandedImageComponent,
    ZoomControlsComponent,
    DraggableDirective
  ],
  exports: [
    AngularImageViewerComponent,
    DraggableDirective
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  providers: [
    ComponentCreatorService,
    DialogExpandedImageService,
    DraggableDirective
  ]
})
export class AngularImageViewerModule { }

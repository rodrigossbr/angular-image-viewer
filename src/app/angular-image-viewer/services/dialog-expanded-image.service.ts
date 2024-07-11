import {ComponentRef, Injectable} from '@angular/core';
import {ComponentCreatorService} from './component-creator.service';
import {DialogExpandedImageComponent} from '../components/dialog-expanded-image/dialog-expanded-image.component';
import {AngularImageViewer} from '../models/angular-image-viewer.model';

@Injectable()
export class DialogExpandedImageService {

  componentRef!: ComponentRef<any>;

  constructor(private dynamicComponentService: ComponentCreatorService) {
  }

  showDialog(params: { image: AngularImageViewer, images: Array<AngularImageViewer> }) {
    this.componentRef = this.dynamicComponentService.appendComponentToBody(DialogExpandedImageComponent, params);
  }

  closeDialog() {
    this.dynamicComponentService.removeComponentFromBody(this.componentRef);
  }
}

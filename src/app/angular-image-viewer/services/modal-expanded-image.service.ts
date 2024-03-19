import {ComponentRef, Injectable} from '@angular/core';
import {ComponentCreatorServiceService} from "./component-creator-service.service";
import {ModalExpandedImageComponent} from "../components/modal-expanded-image/modal-expanded-image.component";
import {AngularImageViewer} from "../models/angular-image-viewer.model";

@Injectable()
export class ModalExpandedImageService {

  componentRef!: ComponentRef<any>;

  constructor(private dynamicComponentService: ComponentCreatorServiceService) {
  }

  addComponentToBody(params: { image: AngularImageViewer, images: Array<AngularImageViewer> }) {
    this.componentRef = this.dynamicComponentService.appendComponentToBody(ModalExpandedImageComponent, params);
  }
}

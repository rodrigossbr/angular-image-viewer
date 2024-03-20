import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AngularImageViewer} from '../../models/angular-image-viewer.model';

@Component({
  selector: 'card-thumbnail',
  templateUrl: './card-thumbnail.component.html',
  styleUrl: './card-thumbnail.component.scss'
})
export class CardThumbnailComponent {

  @Input() public image!: AngularImageViewer;
  @Input() public selected: boolean = false;

  @Output() public selectImage = new EventEmitter<AngularImageViewer>();

  onSelectImage() {
    this.selectImage.emit(this.image);
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {AngularImageViewer} from '../../models/angular-image-viewer.model';
import {of} from "rxjs";

@Component({
  selector: 'app-thumbnail-list',
  templateUrl: './thumbnail-list.component.html',
  styleUrl: './thumbnail-list.component.scss'
})
export class ThumbnailListComponent implements OnInit {

  @ViewChild('thumbnailsSelector') thumbnailsSelector!: ElementRef;
  @ViewChildren('thumbnails') thumbnails!: QueryList<ElementRef>;

  @Input() public images: Array<AngularImageViewer> = [];
  @Input() public selectedImage!: AngularImageViewer;

  @Output() public onSelectImage = new EventEmitter<AngularImageViewer>();

  _showButtons: boolean = true;


  ngOnInit(): void {
    if (!this.selectedImage && this.images.length) {
      this.selectedImage = this.images[0];
    }
  }

  protected selectImage(image: AngularImageViewer) {
    this.selectedImage = image;
    this.onSelectImage.emit(this.selectedImage);

    const selectedIndex = this.images.indexOf(this.selectedImage);
    this.goToScroll(selectedIndex - 1);
  }

  protected back() {
    const selectedIndex = this.images.indexOf(this.selectedImage);
    (selectedIndex > 0) && this.selectImage(this.images[selectedIndex - 1]);
  }

  protected next() {
    const selectedIndex = this.images.indexOf(this.selectedImage);
    (selectedIndex < (this.images.length - 1)) && this.selectImage(this.images[selectedIndex + 1]);
  }

  private goToScroll(index: number) {
    this.thumbnails.toArray()[index]?.nativeElement?.scrollIntoView({behavior: 'smooth'});
  }

  protected showButtons() {
    const show = this.thumbnailsSelector?.nativeElement?.scrollHeight > this.thumbnailsSelector?.nativeElement?.clientHeight;
    if (this._showButtons !== show) {
      setTimeout(() => this._showButtons = show);
    }
    return this._showButtons;
  }
}

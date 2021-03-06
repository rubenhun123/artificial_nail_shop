import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/models/Image';
import { GalleryService } from '../../shared/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryObject?: Array<Image>;
  chosenImg?: any;

  constructor(private galleryService: GalleryService) {
    
   }

  ngOnInit(): void {
    this.galleryService.loadImageMeta('__pics.json').subscribe((data: Array<Image>) => {    
      this.galleryObject = data;
    })
  }

  reload(){
    
  }

  loadImage(imageObject: Image){
    this.chosenImg = imageObject;
  }

}
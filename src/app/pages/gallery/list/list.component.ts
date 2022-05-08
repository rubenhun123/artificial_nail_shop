import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {


  @Input() galleryObjectInput?: Array<any>;
  @Output() imageObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenImg: any;

  constructor() {
    
   }

  ngOnChanges() {
    if(this.galleryObjectInput) {
      this.chosenImg = this.galleryObjectInput[0];
      this.reload();
    }
  }

  ngOnInit(): void {

  }

  reload(){
    this.imageObjectEmitter.emit(this.chosenImg);
  }


}



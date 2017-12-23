import { Component, OnInit , Input , Output,EventEmitter,ViewChild } from '@angular/core';
import { Place } from '../../models/place.model';
import { SwiperComponent } from 'angular2-useful-swiper';


@Component({
  selector: 'app-thumbnail-view',
  templateUrl: './thumbnail-view.component.html',
  styleUrls: ['./thumbnail-view.component.css']
})
export class ThumbnailViewComponent implements OnInit {
  @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;

  @Input() photos:{small:string,large:string}[] = [];
  @Input() title:string = "";
  @Input() isPinned:boolean = false;
  @Output() onHover = new EventEmitter<any>()
  hover : boolean = false;
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0
  };


  constructor() { }

  ngOnInit() {
    console.log("[ThumbnailViewComponent]" ,this.photos );
  }
  
  hovered() {
    this.hover = true;
    console.log("Swiper",this.usefulSwiper);
    
    this.onHover.emit();
  }
 
  onMouseLeave(){

    
    this.hover = false;
  }
}

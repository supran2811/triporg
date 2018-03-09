import { Component, 
          OnInit , 
          Input , 
          Output,
          EventEmitter } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable,Subject } from 'rxjs/Rx';

import { Place } from '../../models/place.model';


@Component({
  selector: 'app-thumbnail-view',
  templateUrl: './thumbnail-view.component.html',
  styleUrls: ['./thumbnail-view.component.css']
})
export class ThumbnailViewComponent implements OnInit {


  @Input() photos:{small:string,large:string}[] = [];
  @Input() title:string = "";
  @Input() isPinned:boolean = false;
  @Output() onHover = new EventEmitter<any>();
  @Output() onClick = new EventEmitter<any>();
  @Output() onLeave = new EventEmitter<any>();

  hover : boolean = false;

  changeIndexAndRefresh = new Subject();
  scrollOrChangeImage$:Observable<any>;
  

  public config: SwiperConfigInterface = {
    scrollbar: null,
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbarHide: false,
    keyboardControl: true,
    mousewheelControl: false,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: true,
    pagination: 'none',
    paginationClickable: true,
    nextButton: 'none',
    prevButton: 'none'
  };

  constructor() { }

  ngOnInit() {
    
    this.scrollOrChangeImage$ = Observable.merge(
      Observable.fromEvent(window,'scroll'),
      this.changeIndexAndRefresh
    );

    this.title = this.title.length > 25? this.title.substr(0,25)+"...":this.title;

  }
  
  hovered() {
    this.hover = true;
    if(this.photos != null && this.photos.length > 1){
      this.enablePagination();
    }
    this.onHover.emit();
  }
 
  onMouseLeave(){
    if(this.photos != null && this.photos.length > 1){
      this.hidePagination();
    }
    this.hover = false;
    this.onLeave.emit();
  }

  onMouseClicked(){
    this.onClick.emit();
  }

  swiperIndexChange(event){
    this.changeIndexAndRefresh.next();
  }

  enablePagination(){
    this.config.pagination = '.swiper-pagination';
    this.config.nextButton = '.swiper-button-next';
    this.config.prevButton = '.swiper-button-prev';
  }

  hidePagination(){
    this.config.pagination = 'none';
    this.config.nextButton = 'none';
    this.config.prevButton = 'none';
  }}

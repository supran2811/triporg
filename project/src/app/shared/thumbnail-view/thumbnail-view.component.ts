import { Component, 
          OnInit , 
          Input , 
          Output,
          EventEmitter } from '@angular/core';
import { Place } from '../../models/place.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable,Subject } from 'rxjs/Rx';


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
    console.log("[ThumbnailViewComponent]" ,this.photos );

    this.scrollOrChangeImage$ = Observable.merge(
      Observable.fromEvent(window,'scroll'),
      this.changeIndexAndRefresh
    );

    this.title = this.title.length > 30? this.title.substr(0,30)+"...":this.title;

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
    console.log("[ThumbnailView]" , "Swiper index change" , event,this.photos,this.photos[event].small);
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

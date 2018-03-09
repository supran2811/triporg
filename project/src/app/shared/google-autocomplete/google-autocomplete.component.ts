import { Component, Input,Output, OnInit,EventEmitter,ChangeDetectorRef  ,ElementRef} from '@angular/core';
import { GooglePlacesService } from '../../shared/google.places.service';

import { Observable, Subject } from 'rxjs/Rx';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-google-autocomplete',
  templateUrl: './google-autocomplete.component.html',
  styleUrls: ['./google-autocomplete.component.css'],
  host:{
    '(document:click)': 'handleClick($event)',
  }
})
export class GoogleAutocompleteComponent implements OnInit {

  @Input() offset:number;
  @Output() selectPrediction = new EventEmitter<any>();
  

  predictions:any[] = [];
  isError = false;

  query$:FormControl;
  

  constructor(private googlePlaces:GooglePlacesService ,
                private changeDetectRef:ChangeDetectorRef,
                private elementRef:ElementRef) { }

  ngOnInit() {
    this.query$ = new FormControl();
    this.query$.valueChanges.debounceTime(400)
          .distinctUntilChanged()
          .flatMap(query => query.length >= this.offset? this.googlePlaces.searchPlace(query):Observable.of([]))     
          .subscribe(result => {
                 this.updateItems(result);
          });
  }

  updateItems(items:any[]){
    this.predictions = items?items:[];
    this.isError = false;
    this.changeDetectRef.detectChanges();
  }

  selectItem(item:any){
     this.selectPrediction.emit(item);
  }

  handleClick(event){
     if(this.elementRef.nativeElement !== event.target){
      this.updateItems([]);
     }
  }
}

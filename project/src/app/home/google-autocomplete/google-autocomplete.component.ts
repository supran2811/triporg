import { Component, Input,Output, OnInit,EventEmitter,ChangeDetectorRef  ,ElementRef} from '@angular/core';
import { GooglePlacesService } from '../../shared/google.places.service';

import { Observable } from 'rxjs/Rx';


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

  query:string = "";
  constructor(private googlePlaces:GooglePlacesService ,
                private changeDetectRef:ChangeDetectorRef,
                private elementRef:ElementRef) { }

  ngOnInit() {
  }

  fireSearchQuery(){
    if(this.query.length >= this.offset)
     {
            this.isError = true;
             this.googlePlaces.searchPlace(this.query).subscribe((res:any[]) =>{
                this.updateItems(res);
            })
     }
     else{
      this.updateItems([]);
     }

  }

  updateItems(items:any[]){
    this.predictions = items?items:[];
    this.isError = false;
    this.changeDetectRef.detectChanges();
  }

  selectItem(item:any){
    console.log("[GoogleAutoComplete]",item);
     this.selectPrediction.emit(item);
  }

  handleClick(event){
     if(this.elementRef.nativeElement !== event.target){
      this.updateItems([]);
     }
  }
}

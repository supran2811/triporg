import { Component, Input,Output, OnInit,EventEmitter,ChangeDetectorRef } from '@angular/core';
import { GooglePlacesService } from '../../shared/google.places.service';

import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-google-autocomplete',
  templateUrl: './google-autocomplete.component.html',
  styleUrls: ['./google-autocomplete.component.css']
})
export class GoogleAutocompleteComponent implements OnInit {

  @Input() offset:number;
  @Output() selectPrediction = new EventEmitter<any>();
  
  predictions:any[] = [];
  isError = false;

  query:string = "";
  constructor(private googlePlaces:GooglePlacesService ,
                private changeDetectRef:ChangeDetectorRef) { }

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

  }

  updateItems(items:any[]){
    this.predictions = items?items:[];
    this.isError = false;
    this.changeDetectRef.detectChanges();
  }

  selectItem(item:any){
     this.selectPrediction.emit(item);

  }
}

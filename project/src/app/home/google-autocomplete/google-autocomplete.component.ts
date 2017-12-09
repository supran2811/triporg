import { Component, Input, OnInit } from '@angular/core';
import { GooglePlacesService } from '../../shared/google.places.service';

@Component({
  selector: 'app-google-autocomplete',
  templateUrl: './google-autocomplete.component.html',
  styleUrls: ['./google-autocomplete.component.css']
})
export class GoogleAutocompleteComponent implements OnInit {

  @Input() offset:number;

  query:string = "";
  constructor(private googlePlaces:GooglePlacesService) { }

  ngOnInit() {
  }

  fireSearchQuery(query){
    console.log("offset",""+this.offset);
     console.log(query , this.query);
     if(this.query.length >= this.offset){
          /// Fire google place search query
            this.googlePlaces.searchPlace(this.query).subscribe((response) =>{
              console.log(response);
            })
     }
  }

}


import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  mySources = [
    "Jaipur",
    "Kanpur"
  ]

  myData = "";
  constructor() { }

  ngOnInit() {
  }

  selectPlace(selectedPlace){
    console.log(selectedPlace);
  }

}

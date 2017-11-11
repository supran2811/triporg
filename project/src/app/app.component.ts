import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBJPM4QjLcMSGN_17eRHCcRhHrct08guhM",
      authDomain: "triporg-1508486982436.firebaseapp.com"
    })
  }
}

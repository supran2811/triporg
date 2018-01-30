import { Component, OnInit,ChangeDetectorRef ,NgZone} from '@angular/core';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import * as fromPlaceReducer from '../store/place.reducer';

@Component({
  selector: 'app-add-new-interniry',
  templateUrl: './add-new-interniry.component.html',
  styleUrls: ['./add-new-interniry.component.css']
})
export class AddNewInterniryComponent implements OnInit {

  constructor( private zone: NgZone,
    private changeDetector: ChangeDetectorRef) { 
   console.log("Inside constructor 111");
   setTimeout(() => {
    this.zone.run(() => {
      this.changeDetector.detectChanges();
    });
  });
}
// setChanged() {
//   this.cdr.markForCheck();
//   this.cdr.detectChanges();
// }
  ngOnInit() {

    console.log("Inside onInit ");
  }

}

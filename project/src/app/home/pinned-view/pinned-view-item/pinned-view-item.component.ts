import { Component, EventEmitter, Input, OnInit ,Output } from '@angular/core';

import { City } from '../../../models/city.model';


@Component({
  selector: 'app-pinned-view-item',
  templateUrl: './pinned-view-item.component.html',
  styleUrls: ['./pinned-view-item.component.css']
})
export class PinnedViewItemComponent implements OnInit {

  @Input() city:City;

  @Output() selectCity = new EventEmitter<City>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(){
    console.log("[PinnedViewItem]" , this.city);
    this.selectCity.emit(this.city);
  }

}

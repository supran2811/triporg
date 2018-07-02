import { Component, EventEmitter, Input ,Output } from '@angular/core';

import { City } from '../../../models/city.model';

@Component({
  selector: 'app-pinned-view-item',
  templateUrl: './pinned-view-item.component.html',
  styleUrls: ['./pinned-view-item.component.css']
})
export class PinnedViewItemComponent {

  @Input() city:City;

  @Output() selectCity = new EventEmitter<City>();

  onSelect(){
    this.selectCity.emit(this.city);
  }

}

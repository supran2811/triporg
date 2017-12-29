import { Component, OnInit ,Input , Output ,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-thumbnail-actions',
  templateUrl: './thumbnail-actions.component.html',
  styleUrls: ['./thumbnail-actions.component.css']
})
export class ThumbnailActionsComponent implements OnInit {

  @Input() config: {id:string,iconClass:string}[] = [] ;
  @Output() iconClicked = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
    console.log("[ThumnailAction]",this.config);
  }

  onIconClicked(id:string){
      console.log("[ThumnailAction]","icon clicked is "+id);
      this.iconClicked.emit(id);
  }
}

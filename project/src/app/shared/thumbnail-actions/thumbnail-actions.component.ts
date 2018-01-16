import { Component, OnInit ,Input , Output ,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-thumbnail-actions',
  template: `<span *ngFor = "let icon of config">
                <i [ngClass] = "icon.iconClass" aria-hidden="true" (click) = "onIconClicked(icon.id)"></i>
            </span>`,
  styles: [ `span > i{
              margin-right: 4px;
            }`]
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

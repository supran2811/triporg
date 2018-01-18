import { Component, OnInit ,Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-backdrop',
  template: `
         <div (click) = "onClick()"></div>`
     ,
  styles: [` 
        div {
          position: fixed;
          top:0;
          bottom: 0;
          left:0;
          width:100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 100;
      }
  `]
})
export class BackdropComponent implements OnInit {

  @Output() clicked  = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.clicked.emit();
  }

}

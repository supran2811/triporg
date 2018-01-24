import { Component, 
              OnInit ,
              Input ,
              ViewChild , 
              ViewContainerRef,
              ComponentFactoryResolver,
              Type,
              EventEmitter,
              Output,
              OnChanges,
              SimpleChanges
               } from '@angular/core';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit , OnChanges{

  @Input() component:Type<any>;
  @Output() backdropIsClicked = new EventEmitter<any>();
  @ViewChild('parentDiv',{read:ViewContainerRef}) parent :ViewContainerRef;

  constructor(private resover:ComponentFactoryResolver) { }

  ngOnInit() {
    // console.log("[ModalComponent] Coming here inside childcomponent render ",this.component);
    // const childComponent = this.resover.resolveComponentFactory(this.component);
    // this.parent.createComponent(childComponent);
  }

  ngOnChanges(changes:SimpleChanges){
    console.log("[ModalComponent] ngOnChanges",changes);
    const newComponent  = changes.component.currentValue;
    const childComponent = this.resover.resolveComponentFactory(newComponent);
    this.parent.clear();
    this.parent.createComponent(childComponent);
  }

  backdropClicked(){
    this.backdropIsClicked.emit();
  }
}

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
  }

  ngOnChanges(changes:SimpleChanges){
    const newComponent  = changes.component.currentValue;
    const childComponent = this.resover.resolveComponentFactory(newComponent);
    this.parent.clear();
    this.parent.createComponent(childComponent);
  }

  backdropClicked(){
    this.backdropIsClicked.emit();
  }
}

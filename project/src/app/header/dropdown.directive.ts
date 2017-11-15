
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector:'[appDropDown]'
})
export class DropDownDirective {
  
    @HostBinding('class.open') open:boolean = false;

    @HostListener('click') toggleOpen() {
        this.open = !this.open;
    }
}
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-info-window',
  template: `<div class = "infowindow">
                  {{message}}
            </div>`,
  styles: [`
          .infowindow{
            color:#777;
            padding:1rem;
            text-align: center;
            background-color: white;
        }
  `]
})
export class InfoWindowComponent {
  @Input() message:string = "";
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `<span>
                  <i class="fa fa-lg" [ngClass] = "rating >= 1? 'fa-star':rating > 0? 'fa-star-half-o' : 'fa-star-o'" aria-hidden="true"></i>
                  <i class="fa fa-lg" [ngClass] = "rating >= 2? 'fa-star':rating > 1? 'fa-star-half-o' : 'fa-star-o'" aria-hidden="true"></i>
                  <i class="fa fa-lg" [ngClass] = "rating >= 3? 'fa-star':rating > 2? 'fa-star-half-o' : 'fa-star-o'" aria-hidden="true"></i>
                  <i class="fa fa-lg" [ngClass] = "rating >= 4? 'fa-star':rating > 3? 'fa-star-half-o' : 'fa-star-o'" aria-hidden="true"></i>
                  <i class="fa fa-lg" [ngClass] = "rating >= 5? 'fa-star':rating > 4? 'fa-star-half-o' : 'fa-star-o'" aria-hidden="true"></i>
                </span>`,
  styles: [`span { color: salmon;}`]
})
export class RatingComponent {
  @Input() rating:number;
}

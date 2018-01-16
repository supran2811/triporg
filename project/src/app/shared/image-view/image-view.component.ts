import { Component,Input ,ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'image-view',
  template: `<img
                [errorImage]="errorImage"
                [lazyLoad]="image"
                [scrollObservable] = "scrollObservable"
                >`,
  styles: [`
                img  {
                        width:100%;
                        height:100%;
                        object-fit: cover;
                    }

                    img.ng-lazyloaded {
                        animation: fadein 2s;
                    }
                    @keyframes fadein {
                        from { opacity: 0; }
                        to   { opacity: 1; }
                    }  
          `]  ,
   changeDetection:ChangeDetectionStrategy.OnPush            
})
export class ImageViewComponent {

     @Input() image;
     @Input() className;
     @Input() scrollObservable;
     @Input() errorImage:string  = "../../../assets/images/download.jpg";
     

}

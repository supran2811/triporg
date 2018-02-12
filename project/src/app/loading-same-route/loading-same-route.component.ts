import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-loading-same-route',
  templateUrl: './loading-same-route.component.html',
  styleUrls: ['./loading-same-route.component.css']
})
export class LoadingSameRouteComponent implements OnInit {

  constructor(private router:Router , private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
       
      console.log("[LoadingSameRouteComponent]",this.activatedRoute.snapshot.queryParams);

    //  this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['navigateToUrl']);

  }

}

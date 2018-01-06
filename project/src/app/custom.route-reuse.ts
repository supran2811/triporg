
import { ActivatedRouteSnapshot ,RouteReuseStrategy ,DetachedRouteHandle } from "@angular/router";
import { PlaceComponent } from "./place/place.component";
import { PlaceDetailsComponent } from "./place/place-details/place-details.component";
import { HomeComponent } from "./home/home.component";


export class CustomRouterReuseStrategy implements RouteReuseStrategy {
    handlers : {[key:string] : DetachedRouteHandle} = {};
    isFutureHomeComponent : boolean;

    shouldDetach(route:ActivatedRouteSnapshot) : boolean {
       console.log("[CustomRouterReuseStrategy] Inside shoudDetach (",route );
        return !this.isFutureHomeComponent && route.component === PlaceComponent;
    }

    store(route:ActivatedRouteSnapshot , handle:DetachedRouteHandle):void {
          console.log("[CustomRouterReuseStrategy]","Inside store",route.component);
          let name = route.component && (<any>route.component).name;
          this.handlers[name] = handle;
    }

    shouldAttach(route:ActivatedRouteSnapshot) :boolean {
        console.log("[CustomRouterReuseStrategy] shouldAttach ",route.url.join('/'),route.component);
        let name = route.component && (<any>route.component).name;
        if(route.component === HomeComponent){
            this.handlers = {};
        }
        else{
            this.isFutureHomeComponent = false;
        }
        return !!this.handlers[name];//route.component === PlaceComponent;
    }


    retrieve(route:ActivatedRouteSnapshot):DetachedRouteHandle {
        console.log("[CustomRouterReuseStrategy] Inside retrieve ",route.url.join('/'));
        let name = route.component && (<any>route.component).name;
        return this.handlers[name];
    }

    shouldReuseRoute(future:ActivatedRouteSnapshot , curr:ActivatedRouteSnapshot) :boolean {
       
        console.log("[CustomRouterReuseStrategy] shouldReuseRoute ",future,curr);

        const isFuturePlaceComponent = (future.children[0] &&  future.children[0].children[0] && future.children[0].children[0].component === PlaceComponent) || null;
        const isCurrPlaceDetails = (curr.children[0] && curr.children[0].children[0] && curr.children[0].children[0].component === PlaceDetailsComponent) || null;   

        if (isFuturePlaceComponent && isCurrPlaceDetails){
                console.log("[CustomRouterReuseStrategy]","My future is PlaceList Component from PlaceDetailsComponent");
                return true;
        }
        else{
            
             this.isFutureHomeComponent = (future.children[0] && future.children[0].component === HomeComponent) ;
            
            // if(isFutureHomeComponent){
            //     console.log("[CustomRouterReuseStrategy]","My future is Home Component from anywhere");
            //     this.handlers = {};
            // }

            return false;
      }  

        
    }
}
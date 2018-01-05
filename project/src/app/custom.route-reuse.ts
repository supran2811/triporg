
import { ActivatedRouteSnapshot ,RouteReuseStrategy ,DetachedRouteHandle } from "@angular/router";
import { PlaceComponent } from "./place/place.component";


export class CustomRouterReuseStrategy implements RouteReuseStrategy {
    handlers : {[key:string] : DetachedRouteHandle} = {};

    shouldDetach(route:ActivatedRouteSnapshot) : boolean {
       console.log("[CustomRouterReuseStrategy] Inside shoudDetach ("+route.url.join('/') );
        return route.component === PlaceComponent;
    }

    store(route:ActivatedRouteSnapshot , handle:DetachedRouteHandle):void {
          console.log("[CustomRouterReuseStrategy]","Inside store",route.url.join('/'));
          let name = route.component && (<any>route.component).name;
          this.handlers[name] = handle;
    }

    shouldAttach(route:ActivatedRouteSnapshot) :boolean {
        console.log("[CustomRouterReuseStrategy] shouldAttach ",route.url.join('/'),route.component);
        
        return route.component === PlaceComponent;
    }


    retrieve(route:ActivatedRouteSnapshot):DetachedRouteHandle {
        console.log("[CustomRouterReuseStrategy] Inside retrieve ",route.url.join('/'));
        let name = route.component && (<any>route.component).name;
        return this.handlers[name];
    }

    shouldReuseRoute(future:ActivatedRouteSnapshot , curr:ActivatedRouteSnapshot) :boolean {
       
        //console.log("[CustomRouterReuseStrategy] shouldReuseRoute=",this.getChildComponentName(future),this.getChildComponentName(curr));
        return false;
    }
}
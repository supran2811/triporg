
import { ComponentRef } from "@angular/core";
import { ActivatedRouteSnapshot,
            RouteReuseStrategy,
            DetachedRouteHandle } from "@angular/router";

            import { PlaceComponent } from "./place/place.component";
import { PlaceDetailsComponent } from "./place/place-details/place-details.component";
import { HomeComponent } from "./home/home.component";



export class CustomRouterReuseStrategy implements RouteReuseStrategy {
    handlers : {[key:string] : DetachedRouteHandle} = {};
    isFutureHomeComponent : boolean;

    shouldDetach(route:ActivatedRouteSnapshot) : boolean {
        return (!this.isFutureHomeComponent && route.component === PlaceComponent);  ;
    }

    store(route:ActivatedRouteSnapshot , handle:DetachedRouteHandle):void {
          let name = route.component && (<any>route.component).name;
          this.handlers[name] = handle;
    }

    shouldAttach(route:ActivatedRouteSnapshot) :boolean {
        let name = route.component && (<any>route.component).name;
        if(route.component === HomeComponent){
            this.deactivateAllHandles();
        }
        else{
            this.isFutureHomeComponent = false;
        }
        return !!this.handlers[name];//route.component === PlaceComponent;
    }


    retrieve(route:ActivatedRouteSnapshot):DetachedRouteHandle {
        let name = route.component && (<any>route.component).name;
        return this.handlers[name];
    }

    shouldReuseRoute(future:ActivatedRouteSnapshot , curr:ActivatedRouteSnapshot) :boolean {
        const isFuturePlaceComponent = (future.children[0] &&  future.children[0].children[0] && future.children[0].children[0].component === PlaceComponent) || null;
        const isCurrPlaceDetails = (curr.children[0] && curr.children[0].children[0] && curr.children[0].children[0].component === PlaceDetailsComponent) || null;   

        if (isFuturePlaceComponent && isCurrPlaceDetails){
                return true;
        }
        else{
            
            this.isFutureHomeComponent = (future.children[0] && future.children[0].component === HomeComponent) ;
            return false;
      }  

        
    }


    deactivateAllHandles() {
        // tslint:disable-next-line forin
        for (const key in this.handlers) {
            this.deactivateOutlet(this.handlers[key])
        }
        this.handlers = {}
    }

    // Todo: we manually destroy the component view here. Since RouteReuseStrategy is experimental, it
    // could break anytime the protocol change. We should alter this once the protocol change.
    private deactivateOutlet(handle: DetachedRouteHandle): void {
        const componentRef: ComponentRef<any> = handle ? handle['componentRef'] : null;
        if (componentRef) {
            componentRef.destroy()
        }
    }
}
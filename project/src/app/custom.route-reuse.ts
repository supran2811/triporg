
import { ComponentRef, Component } from "@angular/core";
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
        console.log("[CustomRouterReuseStrategy] shouldDetach" , this.isFutureHomeComponent , route.component);
        return (!this.isFutureHomeComponent && route.component === PlaceComponent);  ;
    }

    store(route:ActivatedRouteSnapshot , handle:DetachedRouteHandle):void {
          
          let name = this.getComponentUniqueName(route.component);
          console.log("[CustomRouterReuseStrategy] storing route",name);
          this.handlers[name] = handle;
    }

    shouldAttach(route:ActivatedRouteSnapshot) :boolean {
        let name = this.getComponentUniqueName(route.component);
       
        console.log("[CustomRouterReuseStrategy] shouldAttach" , route.component,name);
        if(route.component === HomeComponent){
            this.deactivateAllHandles();
        }
        else{
            this.isFutureHomeComponent = false;
        }
        return !!this.handlers[name];//route.component === PlaceComponent;
    }


    retrieve(route:ActivatedRouteSnapshot):DetachedRouteHandle {
        let name = this.getComponentUniqueName(route.component);
        return this.handlers[name];
    }

    shouldReuseRoute(future:ActivatedRouteSnapshot , curr:ActivatedRouteSnapshot) :boolean {
        if(future.children[0] &&  future.children[0].children[0]){
            console.log("[CustomRouterReuseStrategy] FUTURE ROUTE ",PlaceComponent.name);
            console.log("[CustomRouterReuseStrategy] shouldReuseRoute fuuture ",future.children[0].children[0].component);
            console.log("[CustomRouterReuseStrategy] shouldReuseRoute future==home",(future.children[0].children[0].component === PlaceComponent));
        }
        if(curr.children[0] && curr.children[0].children[0]){
            console.log("[CustomRouterReuseStrategy] CURRNT ROUTE ",PlaceDetailsComponent.name);
            console.log("[CustomRouterReuseStrategy] shouldReuseRoute curr ",curr.children[0].children[0].component);
            console.log("[CustomRouterReuseStrategy] shouldReuseRoute curr==details",(curr.children[0].children[0].component === PlaceDetailsComponent));
        }

        const isFuturePlaceComponent = (future.children[0] &&  future.children[0].children[0] && future.children[0].children[0].component === PlaceComponent) || null;
        const isCurrPlaceDetails = (curr.children[0] && curr.children[0].children[0] && curr.children[0].children[0].component === PlaceDetailsComponent) || null;   

        if (isFuturePlaceComponent && isCurrPlaceDetails){
                return true;
        }
        else{
            console.log("[CustomRouterReuseStrategy] Returning false");
            this.isFutureHomeComponent = (future.children[0] && future.children[0].component instanceof HomeComponent) ;
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

    private getComponentUniqueName(component:any) : string {
        return component === PlaceComponent?'1':
                        component === HomeComponent?'2':
                                component === PlaceDetailsComponent?'3':
                                    '4';
    }
}
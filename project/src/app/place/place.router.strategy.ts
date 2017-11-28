import { RouteReuseStrategy,DetachedRouteHandle,ActivatedRouteSnapshot } from "@angular/router";

export class PlaceRouterStrategy implements RouteReuseStrategy{
    routesToCache = ["place/:id"];
    storedRouteHandle = new Map<string,DetachedRouteHandle>();
    shouldDetach(route:ActivatedRouteSnapshot): boolean {
        console.log("Inside shouldDetach",route.routeConfig.path);
        return this.routesToCache.indexOf(route.routeConfig.path) > -1;
    }

    store(route:ActivatedRouteSnapshot,handle:DetachedRouteHandle):void{
        console.log("Inside store",route.routeConfig.path);
        this.storedRouteHandle.set(route.routeConfig.path,handle);
    }

    shouldAttach(route:ActivatedRouteSnapshot):boolean{
        console.log("Inside shouldAttach",route.routeConfig.path);
        return this.storedRouteHandle.has(route.routeConfig.path);
    }

    retrieve(route:ActivatedRouteSnapshot):DetachedRouteHandle{
        console.log("Inside retrieve",route.routeConfig.path);
        return this.storedRouteHandle.get(route.routeConfig.path);
    }

    shouldReuseRoute(future:ActivatedRouteSnapshot , curr:ActivatedRouteSnapshot){
        console.log("Inside shouldReuseRoute",future.routeConfig,curr.routeConfig);
        return future.routeConfig === curr.routeConfig;
    }
}
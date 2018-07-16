import {Type } from "@angular/core";
import { Action } from "@ngrx/store";

export const SHOW_MODAL       = "SHOW_MODAL";
export const HIDE_MODAL       = "HIDE_MODAL";

export class ShowModal implements Action {
    readonly type = SHOW_MODAL;
    public constructor(public payload:Type<any>){}
}

export class HideModal implements Action {
    readonly type = HIDE_MODAL;
}


export type AppActions = ShowModal|
                            HideModal;

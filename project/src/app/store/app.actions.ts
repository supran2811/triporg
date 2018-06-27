import { Component,Type } from "@angular/core";

export const SHOW_MODAL       = "SHOW_MODAL";
export const HIDE_MODAL       = "HIDE_MODAL";

export class ShowModal{
    readonly type = SHOW_MODAL;
    public constructor(public payload:Type<any>){}
}

export class HideModal {
    readonly type = HIDE_MODAL;
}


export type AppActions = ShowModal|
                            HideModal;

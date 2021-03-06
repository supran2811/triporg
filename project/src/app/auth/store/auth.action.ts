import { Action } from '@ngrx/store';
import * as firebase from 'firebase';

import { User } from '../../models/user.model';

export const DO_REGISTER    = "DO_REGISTER";
export const START_AUTH     = "START_AUTH";
export const DO_LOGIN       = "DO_LOGIN";
export const DO_LOGOUT      = "DO_LOGOUT";
export const SET_TOKEN      = "SET_TOKEN";
export const SET_USER       = "SET_USER";
export const REGISTER       = "REGISTER";
export const LOGIN          = "LOGIN";
export const LOGOUT         = "LOGOUT";
export const SHOW_ERROR     = "SHOW_ERROR";
export const RESET_ERROR    = "RESET_ERROR";
export const GET_TOKEN      = "GET_TOKEN";

export class DoRegisterAction implements Action {
    readonly type = DO_REGISTER;
    constructor(public payload : {user:User , password:string}){}
}

export class RegisterAction implements Action{
    readonly type = REGISTER;
}

export class DoLoginAction implements Action {
  readonly type = DO_LOGIN;
  constructor(public payload:{email:string,password:string , returnUrl:string}){}
}

export class LoginAction implements Action {
    readonly type = LOGIN;
}

export class DoLogoutAction implements Action {
    readonly type = DO_LOGOUT;
}

export class LogoutAciton implements Action {
    readonly type = LOGOUT;
}

export class SetTokenAction implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload:{token:string,uid:string}){}
}


export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor(public payload:User){}
}

export class ShowErrorMessageAction implements Action {
    readonly type = SHOW_ERROR;
    constructor(public payload:string){}
}

export class ResetErrorMessageAction implements Action {
    readonly type = RESET_ERROR;
}

export class GetTokenAction implements Action {
    readonly type = GET_TOKEN;
}

export class StartAuth implements Action {
    readonly type = START_AUTH;
}
export type AuthActions = DoRegisterAction |
                          RegisterAction | 
                          DoLoginAction |
                          LoginAction |
                          LogoutAciton |
                          SetTokenAction |
                          SetUserAction|
                          ShowErrorMessageAction|
                          ResetErrorMessageAction|
                          GetTokenAction|
                          StartAuth;
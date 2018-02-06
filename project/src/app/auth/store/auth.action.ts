import { Action } from '@ngrx/store';
import * as firebase from 'firebase';

import { User } from '../../models/user.model';

export const DO_REGISTER    = "DO_REGISTE  R";
export const START_AUTH = "START_AUTH";
export const DO_LOGIN       = "DO_LOGI N";
export const DO_LOGOUT      = "DO_LOGOU    T";
export const SET_TOKEN      = "SET_TOKE    N";
export const SET_USER       = "SET_USE R";
export const REGISTER       = "REGISTE R";
export const LOGIN          = "LOGI    N";
export const LOGOUT         = "LOGOU   T";
export const SHOW_ERROR     = "SHOW_ERR    OR";
export const RESET_ERROR    = "RESET_ERRO  R";
export const GET_TOKEN      = "GET_TOK  EN";

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
import * as AuthActions from './auth.action';
import { User } from '../../models/user.model';


export interface State{
    user:User,
    token:string,
    authorised:boolean,
    hasError:boolean,
    errorMessage:string
}

const initialState : State = {
    user:null,
    token:"",
    authorised:false,
    hasError:false,
    errorMessage:''
}

export function AuthReducer(state=initialState , action:AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.LOGIN:
        case AuthActions.REGISTER:{
            return {
                 ...state,
                 authorised:true
             }   
        }
        case AuthActions.SET_TOKEN:{
            return {
                ...state,
                token:action.payload
            }
        }
        case AuthActions.SET_USER :{
            
            sessionStorage.setItem('fullname',action.payload.getFullName());
            sessionStorage.setItem('email',action.payload.getEmail());
            
            return {
                ...state,
                user:action.payload
            }
        }
        case AuthActions.SHOW_ERROR:{
            return {
                ...state,
                hasError:true,
                errorMessage:action.payload
            }
        }
        default:{
            {
                return state;
            }
        }
    }
}
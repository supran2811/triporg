import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PopoverModule } from 'ngx-popover'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations:[
        RegisterComponent,
        LoginComponent
    ],
    imports:[
        FormsModule,
        PopoverModule,
        CommonModule
    ]
})
export class AuthModule{

}
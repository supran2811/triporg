import { SharedModule } from '../shared/shared.module';
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
        PopoverModule,
        SharedModule
    ]
})
export class AuthModule{

}
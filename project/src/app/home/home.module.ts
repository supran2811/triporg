import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {NguiAutoCompleteModule} from '@ngui/auto-complete'

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { PinnedViewComponent } from './pinned-view/pinned-view.component';
import { PinnedViewItemComponent } from './pinned-view/pinned-view-item/pinned-view-item.component';
import { FormsModule } from '@angular/forms';


@NgModule(
    {
        declarations:[
            HomeComponent,
            PinnedViewComponent,
            PinnedViewItemComponent
        ],
        imports:[
            SharedModule,
            NguiAutoCompleteModule,
            RouterModule
        ]
    }
)
export class HomeModule {}
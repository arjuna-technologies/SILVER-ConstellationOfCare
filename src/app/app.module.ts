import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }        from '@angular/common/http';

import { MatToolbarModule }     from '@angular/material/toolbar';
import { MatSidenavModule }     from '@angular/material/sidenav';
import { MatDialogModule }      from '@angular/material/dialog';
import { MatTabsModule }        from '@angular/material/tabs';
import { MatTableModule }       from '@angular/material/table'
import { MatPaginatorModule }   from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule }   from '@angular/material/expansion';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { MatCardModule }        from '@angular/material/card';
import { MatListModule }        from '@angular/material/list';
import { MatChipsModule }       from '@angular/material/chips';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent }                  from './app.component';
import { LoginDialogComponent }          from './login-dialog/login-dialog.component';
import { FamilyBookmarksComponent }      from './family-bookmarks/family-bookmarks.component';
import { InformationBookmarksComponent } from './information-bookmarks/information-bookmarks.component';
import { FamilyComponent }               from './family/family.component';
import { FamilyMemberComponent }         from './family-member/family-member.component';
import { PersonComponent }               from './person/person.component';
import { OrganizationComponent }         from './organization/organization.component';
import { DataSourceComponent }           from './data-source/data-source.component';
import { AccessProcessComponent }        from './access-process/access-process.component';
import { DataTypesComponent }            from './data-types/data-types.component';
import { DataTypeComponent }             from './data-type/data-type.component';
import { DataComponent }                 from './data/data.component';
import { TimelineComponent }             from './timeline/timeline.component';
import { EventsComponent }               from './events/events.component';
import { MIGInformationComponent }       from './mig-information/mig-information.component';

import { AuthenticationService }     from './authentication.service';
import { DataService }               from './data.service';
import { GoogleChartsLoaderService } from './googlecharts-loader.service';

@NgModule
({
    declarations:
    [
        AppComponent,
        LoginDialogComponent,
        FamilyBookmarksComponent,
        InformationBookmarksComponent,
        FamilyComponent,
        FamilyMemberComponent,
        PersonComponent,
        OrganizationComponent,
        DataSourceComponent,
        AccessProcessComponent,
        DataTypesComponent,
        DataTypeComponent,
        DataComponent,
        TimelineComponent,
        EventsComponent,
        MIGInformationComponent
    ],
    imports:
    [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatDialogModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatChipsModule,
        FlexLayoutModule
    ],
    entryComponents:
    [
        LoginDialogComponent
    ],
    providers:
    [
        AuthenticationService,
        DataService,
        GoogleChartsLoaderService
    ],
    bootstrap:
    [
        AppComponent
    ]
})
export class AppModule
{
}

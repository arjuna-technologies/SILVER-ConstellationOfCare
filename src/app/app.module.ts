import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule }     from '@angular/material/toolbar';
import { MatSidenavModule }     from '@angular/material/sidenav';
import { MatDialogModule }      from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule }   from '@angular/material/expansion';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { MatCardModule }        from '@angular/material/card';
import { MatListModule }        from '@angular/material/list';
import { MatChipsModule }       from '@angular/material/chips';

import { AppComponent }                  from './app.component';
import { LoginDialogComponent }          from './login-dialog/login-dialog.component';
import { FamilyBookmarksComponent }      from './family-bookmarks/family-bookmarks.component';
import { InformationBookmarksComponent } from './information-bookmarks/information-bookmarks.component';
import { FamilyComponent }               from './family/family.component';
import { PersonComponent }               from './person/person.component';
import { OrganizationComponent }         from './organization/organization.component';
import { DataSourceComponent }           from './data-source/data-source.component';
import { AccessProcessComponent }        from './access-process/access-process.component';
import { DataComponent }                 from './data/data.component';

import { AuthenticationService } from './authentication.service';
import { DataService }           from './data.service';

@NgModule
({
    declarations:
    [
        AppComponent,
        LoginDialogComponent,
        FamilyBookmarksComponent,
        InformationBookmarksComponent,
        FamilyComponent,
        PersonComponent,
        OrganizationComponent,
        DataSourceComponent,
        AccessProcessComponent,
        DataComponent
    ],
    imports:
    [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatDialogModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatChipsModule
    ],
    entryComponents:
    [
        LoginDialogComponent
    ],
    providers:
    [
        AuthenticationService,
        DataService
    ],
    bootstrap:
    [
        AppComponent
    ]
})
export class AppModule
{
}

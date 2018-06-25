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

import { AppComponent }                         from './app.component';
import { LoginDialogComponent }                 from './login-dialog/login-dialog.component';
import { FamilyBookmarksComponent }             from './family-bookmarks/family-bookmarks.component';
import { FamilyComponent }                      from './family/family.component';
import { FamilyMemberComponent }                from './family-member/family-member.component';
import { MIGInformationComponent }              from './mig-information/mig-information.component';
import { MIGAdminDomainComponent }              from './mig-admindomain/mig-admindomain.component';
import { MIGAdminDomainPersonsComponent }       from './mig-admindomain-persons/mig-admindomain-persons.component';
import { MIGAdminDomainPatientsComponent }      from './mig-admindomain-patients/mig-admindomain-patients.component';
import { MIGAdminDomainOrganisationsComponent } from './mig-admindomain-organisations/mig-admindomain-organisations.component';
import { MIGAdminDomainLocationsComponent }     from './mig-admindomain-locations/mig-admindomain-locations.component';
import { MIGAdminDomainUsersComponent }         from './mig-admindomain-users/mig-admindomain-users.component';
import { MIGAdminDomainRolesComponent }         from './mig-admindomain-roles/mig-admindomain-roles.component';
import { MIGAdminDomainUserInRolesComponent }   from './mig-admindomain-userinroles/mig-admindomain-userinroles.component';
import { MIGHealthDomainComponent }             from './mig-healthdomain/mig-healthdomain.component';
import { MIGHealthDomainEncountersComponent }   from './mig-healthdomain-encounters/mig-healthdomain-encounters.component';
import { MIGHealthDomainProblemsComponent }     from './mig-healthdomain-problems/mig-healthdomain-problems.component';
import { MIGHealthDomainEventsComponent }       from './mig-healthdomain-events/mig-healthdomain-events.component';

import { AuthenticationService } from './authentication.service';
import { DataService }           from './data.service';
import { MIGInformationService } from './mig-information.service';

@NgModule
({
    declarations:
    [
        AppComponent,
        LoginDialogComponent,
        FamilyBookmarksComponent,
        FamilyComponent,
        FamilyMemberComponent,
        MIGInformationComponent,
        MIGAdminDomainComponent,
        MIGAdminDomainPersonsComponent,
        MIGAdminDomainPatientsComponent,
        MIGAdminDomainOrganisationsComponent,
        MIGAdminDomainLocationsComponent,
        MIGAdminDomainUsersComponent,
        MIGAdminDomainRolesComponent,
        MIGAdminDomainUserInRolesComponent,
        MIGHealthDomainComponent,
        MIGHealthDomainEncountersComponent,
        MIGHealthDomainProblemsComponent,
        MIGHealthDomainEventsComponent
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
        MIGInformationService
    ],
    bootstrap:
    [
        AppComponent
    ]
})
export class AppModule
{
}

import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }             from '@angular/forms';
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
import { MatRadioModule }       from '@angular/material/radio';
import { MatIconModule }        from '@angular/material/icon';
import { MatCardModule }        from '@angular/material/card';
import { MatListModule }        from '@angular/material/list';
import { MatChipsModule }       from '@angular/material/chips';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent }                         from './app.component';
import { LoginDialogComponent }                 from './login-dialog/login-dialog.component';
import { FamilyBookmarksComponent }             from './family/family-bookmarks/family-bookmarks.component';
import { FamilyComponent }                      from './family/family/family.component';
import { FamilyMemberComponent }                from './family/family-member/family-member.component';
import { MIGInformationComponent }              from './mig/mig-information/mig-information.component';
import { MIGAdminDomainComponent }              from './mig/mig-admindomain/mig-admindomain.component';
import { MIGAdminDomainPersonsComponent }       from './mig/mig-admindomain-persons/mig-admindomain-persons.component';
import { MIGAdminDomainPatientsComponent }      from './mig/mig-admindomain-patients/mig-admindomain-patients.component';
import { MIGAdminDomainOrganisationsComponent } from './mig/mig-admindomain-organisations/mig-admindomain-organisations.component';
import { MIGAdminDomainLocationsComponent }     from './mig/mig-admindomain-locations/mig-admindomain-locations.component';
import { MIGAdminDomainUsersComponent }         from './mig/mig-admindomain-users/mig-admindomain-users.component';
import { MIGAdminDomainRolesComponent }         from './mig/mig-admindomain-roles/mig-admindomain-roles.component';
import { MIGAdminDomainUserInRolesComponent }   from './mig/mig-admindomain-userinroles/mig-admindomain-userinroles.component';
import { MIGHealthDomainComponent }             from './mig/mig-healthdomain/mig-healthdomain.component';
import { MIGHealthDomainEncountersComponent }   from './mig/mig-healthdomain-encounters/mig-healthdomain-encounters.component';
import { MIGHealthDomainProblemsComponent }     from './mig/mig-healthdomain-problems/mig-healthdomain-problems.component';
import { MIGHealthDomainEventsComponent }       from './mig/mig-healthdomain-events/mig-healthdomain-events.component';
import { ConstellationComponent }               from './report/constellation/constellation.component';
import { PatientOverviewComponent }             from './report/patient-overview/patient-overview.component';
import { PatientEventsComponent }               from './report/patient-events/patient-events.component';

import { AuthenticationService }      from './authentication.service';
import { FamilyDataService }          from './family/family-data.service';
import { MIGDataService }             from './mig/mig-data.service';
import { MIGInformationIndexService } from './mig/mig-information-index.service';
import { PatientProblemsComponent } from './report/patient-problems/patient-problems.component';

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
        MIGHealthDomainEventsComponent,
        ConstellationComponent,
        PatientOverviewComponent,
        PatientEventsComponent,
        PatientProblemsComponent
    ],
    imports:
    [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
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
        MatRadioModule,
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
        FamilyDataService,
        MIGDataService,
        MIGInformationIndexService
    ],
    bootstrap:
    [
        AppComponent
    ]
})
export class AppModule
{
}

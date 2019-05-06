import {NgModule}                from '@angular/core';
import {BrowserModule}           from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule}        from '@angular/common/http';

import {MatToolbarModule}     from '@angular/material/toolbar';
import {MatCheckboxModule}    from '@angular/material/checkbox';
import {MatSidenavModule}     from '@angular/material/sidenav';
import {MatDialogModule}      from '@angular/material/dialog';
import {MatTabsModule}        from '@angular/material/tabs';
import {MatDatepickerModule}  from '@angular/material/datepicker';
import {MatNativeDateModule}  from '@angular/material';
import {MAT_DATE_LOCALE}      from '@angular/material';
import {MatSelectModule}      from '@angular/material/select';
import {MatTableModule}       from '@angular/material/table'
import {MatPaginatorModule}   from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule}   from '@angular/material/expansion';
import {MatFormFieldModule}   from '@angular/material/form-field';
import {MatInputModule}       from '@angular/material';
import {MatButtonModule}      from '@angular/material/button';
import {MatMenuModule}        from '@angular/material/menu';
import {MatRadioModule}       from '@angular/material/radio';
import {MatIconModule}        from '@angular/material/icon';
import {MatCardModule}        from '@angular/material/card';
import {MatListModule}        from '@angular/material/list';
import {MatChipsModule}       from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent}                         from './app.component';
import {LoginDialogComponent}                 from './login-dialog/login-dialog.component';
import {FamilyChooserButtonComponent}         from './family/family-chooser-button/family-chooser-button.component';
import {FamilyMemberChooserButtonComponent}   from './family/family-member-chooser-button/family-member-chooser-button.component';
import {FamilyMemberMenuItemComponent}        from './family/family-member-menu-item/family-member-menu-item.component';
import {MIGInformationComponent}              from './mig/mig-information/mig-information.component';
import {MIGHealthDomainDocumentsComponent}    from './mig/mig-healthdomain-documents/mig-healthdomain-documents.component';
import {MIGHealthDomainUnifiedEventsComponent} from './mig/mig-healthdomain-unified-events/mig-healthdomain-unified-events.component';

import {ConstellationComponent}               from './report/constellation/constellation.component';
import {FamilyMemberDetailsFormComponent}     from './family/family-member-details-form/family-member-details-form.component';

import {AuthenticationService}      from './authentication.service';
import {FamilyDataService}          from './family/family-data.service';
import {MIGDataService}             from './mig/mig-data.service';
import {MIGInformationIndexService} from './mig/mig-information-index.service';
import {HealthTimelineComponent} from './report/health-timeline/health-timeline.component';
import {MIGHealthTimelineComponent} from './report/mig-health-timeline/mig-health-timeline.component';
import {StorageService}             from './storage.service';
import {CaseManagementButtonComponent} from './report/case-management-button/case-management-button.component';
import {FamilyFormComponent} from './family/family-form/family-form.component';
import {FamiliesFormComponent} from './family/families-form/families-form.component';
import {CaseManagementScreenComponent} from './admin/case-management-screen/case-management-screen.component';
import {FamilyListPanelComponent} from './family/family-list-panel/family-list-panel.component';
import {ConsentScreenComponent} from './family/consent-screen/consent-screen.component';
import {FilterControlsComponent} from './report/filter-controls/filter-controls.component';
import { ConsentHistoryScreenComponent } from './family/consent-history-screen/consent-history-screen.component';

@NgModule
({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    FamilyChooserButtonComponent,
    FamilyMemberChooserButtonComponent,
    FamilyMemberMenuItemComponent,
    MIGInformationComponent,
    MIGHealthDomainDocumentsComponent,
    MIGHealthDomainUnifiedEventsComponent,
    ConstellationComponent,
    HealthTimelineComponent,
    MIGHealthTimelineComponent,
    CaseManagementButtonComponent,
    FamilyMemberDetailsFormComponent,
    FamilyFormComponent,
    FamiliesFormComponent,
    CaseManagementScreenComponent,
    FamilyListPanelComponent,
    ConsentScreenComponent,
    FilterControlsComponent,
    ConsentHistoryScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    FlexLayoutModule,
    MatGridListModule
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  providers: [
    AuthenticationService,
    FamilyDataService,
    MIGDataService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    MIGInformationIndexService,
    MatDatepickerModule,
    StorageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

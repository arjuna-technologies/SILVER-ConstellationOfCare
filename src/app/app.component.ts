import {Component, ViewChild, Input, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';

import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {FamilyComponent} from './family/family/family.component';
import {FamilyChooserButtonComponent} from './family/family-chooser-button/family-chooser-button.component';
import {MIGInformationComponent} from './mig/mig-information/mig-information.component';
import {CaseManagementScreenComponent} from './report/case-management-screen/case-management-screen.component'
import {CaseManagementButtonComponent} from './report/case-management-button/case-management-button.component'
import {FamilyMember} from './family/family-member';
import {Family} from './family/family';

import { MIGDataService } from './mig/mig-data.service';

@Component
({
  selector: 'cnstll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public username: string;
  public org: string;
  public group: string;

  public managementMode: any;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public family: Family;

  @ViewChild('familyChooserButton')
  public familyChooserButton: FamilyChooserButtonComponent;

  @ViewChild('familyButton')
  public familyButton: FamilyComponent;

  @ViewChild('miginformation')
  public migInformation: MIGInformationComponent;

  @ViewChild('caseManagementButton')
  public caseManagementButton: CaseManagementScreenComponent;

  @ViewChild('caseManagementScreen')
  public caseManagementScreen: CaseManagementScreenComponent;

  public requestTypes: any[];
  public requestTypeCode: string;

  public setFamily(family) {
    this.family = family;
    this.setFamilyMember(null);
  }

  public setFamilyMember(familyMember) {
    this.familyMember = familyMember;
  }

  public constructor(private dialog: MatDialog) {
    this.familyMember=null;
    this.managementMode=true;
    this.username = '';
    this.org = '';
    this.group = '';
    this.requestTypeCode = MIGDataService.ALLGPDATA_REQUEST_NAME;
    this.requestTypes =
      [
        {code: MIGDataService.ALLGPDATA_REQUEST_NAME, label: 'All'},
        {code: MIGDataService.SUMMARY_REQUEST_NAME, label: 'Summarys'},
        {code: MIGDataService.PROBLEM_REQUEST_NAME, label: 'Problems'},
        {code: MIGDataService.DIAGNOSIS_REQUEST_NAME, label: 'Diagnoses'},
        {code: MIGDataService.MEDICATION_REQUEST_NAME, label: 'Medications'},
        {code: MIGDataService.RISKSWARNING_REQUEST_NAME, label: 'Risk Warnings'},
        {code: MIGDataService.PROCEDURE_REQUEST_NAME, label: 'Procedures'},
        {code: MIGDataService.INVESTIGATION_REQUEST_NAME, label: 'Investigations'},
        {code: MIGDataService.EXAMINATION_REQUEST_NAME, label: 'Examinations'},
        {code: MIGDataService.EVENT_REQUEST_NAME, label: 'Events'},
        {code: MIGDataService.PATIENTDETAIL_REQUEST_NAME, label: 'Patient Details'}
      ];
    this.doOpenLoginDialog();
  }

  public doOpenLoginDialog(): void {
    if (this.username === '') {
      const loginDialogRef = this.dialog.open(LoginDialogComponent);
      loginDialogRef.afterClosed().subscribe((username) => this.processAfterClose(username));
    }
    else {
      this.username = '';
      this.org = '';
      this.group = '';

      this.family=null;
      this.familyMember=null;
      this.managementMode=true;
    }
  }

  private processAfterClose(username: string): void {
    if (username && (username !== '')) {
      this.username = username;
      this.org = 'Newcastle City Council';
      this.group = 'Family Early Help';
    }
    else {
      this.username = '';
      this.org = '';
      this.group = '';
    }
  }
}

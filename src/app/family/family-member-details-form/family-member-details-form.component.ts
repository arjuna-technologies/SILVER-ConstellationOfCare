import {
  Component,
  OnChanges,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {FamilyMember} from '../family-member';
import {MIGPatientTrace} from '../../mig/mig-patienttrace';
import {MIGDataService} from '../../mig/mig-data.service';
import {ConsentsService} from '../../consent/consents.service';

export interface Gender {
  value: string;
  viewValue: string;
}

export interface MatchForDisplay {
  nhsNumber: string;
  displayText: string;
}

import {NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from "@angular/material";

export class AppDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: Object): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    } else {
      return date.toLocaleDateString("en-GB");
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const APP_DATE_FORMATS =
{
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
    //dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
}


@Component({
  selector: 'cnstll-family-member-details-form',
  templateUrl: './family-member-details-form.component.html',
  styleUrls: ['./family-member-details-form.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class FamilyMemberDetailsFormComponent implements OnInit, OnChanges, AfterContentInit {

  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('surname') surname: ElementRef;
  @ViewChild('dateOfBirth') dateOfBirth: ElementRef;
  @ViewChild('gender') legalGender: string;
  @ViewChild('role') role: ElementRef;
  @ViewChild('nhsNumber') nhsNumber: ElementRef;
  @ViewChild('postcode') postcode: ElementRef;

  genders: Gender[] = [
    {value: 'Female', viewValue: 'Female'},
    {value: 'Male', viewValue: 'Male'},
    {value: 'Indeterminate', viewValue: 'Indeterminate'},
    {value: 'Unknown', viewValue: 'Unknown'}
  ];

  nhsMatchesForDisplay: MatchForDisplay[] = [];

  @Input()
  public editing: any = false;

  @Input()
  public familyMemberToEdit: FamilyMember;

  @Output()
  public newFamilyMemberSaver: EventEmitter<FamilyMember> = new EventEmitter<FamilyMember>();

  @Output()
  public editedFamilyMemberSaver: EventEmitter<FamilyMember> = new EventEmitter<FamilyMember>();

  constructor(private migDataService: MIGDataService, private consentsService: ConsentsService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.familyMemberToEdit) {
      if (this.familyMemberToEdit.dateOfBirth) {
        this.dateOfBirth.nativeElement.value = this.familyMemberToEdit.dateOfBirth;
      }
      if (this.familyMemberToEdit.gender) {
        this.legalGender = this.familyMemberToEdit.gender;
      }
    }
  }

  ngAfterContentInit() {
      console.log(this.familyMemberToEdit);
      if (this.familyMemberToEdit) {
        if (this.familyMemberToEdit.dateOfBirth) {
          this.dateOfBirth.nativeElement.value = this.familyMemberToEdit.dateOfBirth;
        }
        if (this.familyMemberToEdit.gender) {
          this.legalGender = this.familyMemberToEdit.gender;
        }
      }
  }

  public saveFamilyMember(event) {
    if (this.editing) {
      this.saveEditedFamilyMember(event);
    }
    else {
      this.saveNewFamilyMember(event);
    }
  }

  public clickNHSMatch(match: MatchForDisplay) {
    this.familyMemberToEdit.nhsNumber = match.nhsNumber;
    this.nhsNumber.nativeElement.value = match.nhsNumber;
    this.nhsMatchesForDisplay = [];
  }

  public doPatientTrace(): void {
    let patientTraceOptions = {};
    if (this.dateOfBirth && this.dateOfBirth.nativeElement.value.split('/').length == 3) {
      patientTraceOptions['dateOfBirth'] = this.dateOfBirth.nativeElement.value;
    }
    if (this.firstName && this.firstName.nativeElement.value.length > 0) {
      patientTraceOptions['firstName'] = this.firstName.nativeElement.value;
    }
    if (this.surname && this.surname.nativeElement.value.length > 0) {
      patientTraceOptions['surname'] = this.surname.nativeElement.value
    }
    if (this.legalGender) {
      patientTraceOptions['gender'] = this.legalGender;
    }
    if (this.postcode && this.postcode.nativeElement.value.length > 0) {
      patientTraceOptions['postcode'] = this.postcode.nativeElement.value;
    }
    this.migDataService.loadMIGPatientTrace(patientTraceOptions)
      .then(patientTrace => this.migPatientTraceSuccess(patientTrace))
      .catch(error => this.migPatientTraceFailed(error));
  }

  private isEPTButtonDisabled() {
    // TODO should only enable if required fields are present.
    return false;
  }

  private isSaveMemberButtonDisabled() {
    let valid_genders = this.genders.map(gender => gender.value);
    if (valid_genders.indexOf(this.legalGender) > -1) {
      return false;
    } else {
      return true;
    }
  }

  private recordConsent() {
    let nhsNumber = this.familyMemberToEdit.nhsNumber;
    this.consentsService.createConsentRecord(nhsNumber);
  }

  private revokeConsent() {
    let nhsNumber = this.familyMemberToEdit.nhsNumber;
    this.consentsService.revokeConsentRecord(nhsNumber);
  }


  private processPatientTraceResults(patientTraceResults: MIGPatientTrace): void {
    let ptr = patientTraceResults;
    if (ptr.status && ptr.patientMatchs.length > 0) {
      this.nhsMatchesForDisplay = [];
      for (let i in ptr.patientMatchs) {
        let personText = ptr.patientMatchs[i].getDisplayText();
        let matchForDisplay: MatchForDisplay = {
          nhsNumber: ptr.patientMatchs[i].nhsNumber,
          displayText: personText
        };
        this.nhsMatchesForDisplay.push(matchForDisplay);
      }
    }
  }

  private migPatientTraceSuccess(patientTrace: MIGPatientTrace): void {
    if (patientTrace !== null) {
      this.processPatientTraceResults(patientTrace);
    }
  }

  private migPatientTraceFailed(patientTrace: MIGPatientTrace): void {
    this.nhsMatchesForDisplay = [];
  }

  public saveNewFamilyMember(event) {
    let id = this.familyMemberToEdit.id;
    let firstName = this.firstName.nativeElement.value;
    let surname = this.surname.nativeElement.value;
    let dateOfBirth = this.dateOfBirth.nativeElement.value;
    let gender = this.legalGender;
    let nhsNumber = this.nhsNumber.nativeElement.value;
    let role = this.role.nativeElement.value;
    let newFamilyMember = new FamilyMember({
      id: id,
      firstName: firstName,
      surname: surname,
      dateOfBirth: dateOfBirth,
      gender: gender,
      nhsNumber: nhsNumber,
      role: role
    });
    this.newFamilyMemberSaver.emit(newFamilyMember);
    this.doPatientTrace();
  }

  public saveEditedFamilyMember(event) {
    let id = this.familyMemberToEdit.id;
    let firstName = this.firstName.nativeElement.value;
    let surname = this.surname.nativeElement.value;
    let dateOfBirth = this.dateOfBirth.nativeElement.value;
    let gender = this.legalGender;
    let nhsNumber = this.nhsNumber.nativeElement.value;
    let role = this.role.nativeElement.value;
    let editedFamilyMember = new FamilyMember({
      id: id,
      firstName: firstName,
      surname: surname,
      dateOfBirth: dateOfBirth,
      gender: gender,
      nhsNumber: nhsNumber,
      role: role
    });
    this.editedFamilyMemberSaver.emit(editedFamilyMember);
    this.doPatientTrace();
  }
}

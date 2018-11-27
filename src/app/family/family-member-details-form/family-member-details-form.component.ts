import {
  Component,
  OnChanges,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {FamilyMember} from '../family-member';
import {MIGPatientTrace} from '../../mig/mig-patienttrace'
import {MIGDataService} from '../../mig/mig-data.service';

export interface Gender {
  value: string;
  viewValue: string;
}

import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";

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
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
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
  ]})
export class FamilyMemberDetailsFormComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('surname') surname: ElementRef;
  @ViewChild('dateOfBirth') dateOfBirth: ElementRef;
  @ViewChild('gender') legalGender: string;
  @ViewChild('role') role: ElementRef;
  @ViewChild('nhsNumber') nhsNumber: ElementRef;

  genders: Gender[] = [
    {value: 'Female', viewValue: 'Female'},
    {value: 'Male', viewValue: 'Male'},
    {value: 'Indeterminate', viewValue: 'Indeterminate'},
    {value: 'Unknown', viewValue: 'Unknown'}
  ];

  possibleNHSMatches: any = [];

  @Input()
  public editing: any = false;

  @Input()
  public familyMemberToEdit: FamilyMember;

  @Output()
  public newFamilyMemberSaver: EventEmitter<FamilyMember> = new EventEmitter<FamilyMember>();

  @Output()
  public editedFamilyMemberSaver: EventEmitter<FamilyMember> = new EventEmitter<FamilyMember>();

  constructor(private migDataService:MIGDataService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    if (this.familyMemberToEdit) {
      if (this.familyMemberToEdit.firstName) {
        this.firstName.nativeElement.value = this.familyMemberToEdit.firstName;
      }
      if (this.familyMemberToEdit.surname) {
        this.surname.nativeElement.value = this.familyMemberToEdit.surname;
      }
      if (this.familyMemberToEdit.dateOfBirth) {
        this.dateOfBirth.nativeElement.value = this.familyMemberToEdit.dateOfBirth;
      }
      if (this.familyMemberToEdit.gender) {
        this.legalGender = this.familyMemberToEdit.gender;
      }
      if (this.familyMemberToEdit.nhsNumber) {
        this.nhsNumber.nativeElement.value = this.familyMemberToEdit.nhsNumber;
      }
      if (this.familyMemberToEdit.role) {
        this.role.nativeElement.value = this.familyMemberToEdit.role;
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


  public doPatientTrace(): void
  {
    let nhsNo = this.nhsNumber.nativeElement.value;
    let firstName = this.firstName.nativeElement.value;
    let surname = this.surname.nativeElement.value;
    let gender = this.legalGender;
    let dateParts = this.dateOfBirth.nativeElement.value.split('/');
    let day = null;
    let month = null;
    let year = null;
    if (dateParts.length==3) {
      day = dateParts[0];
      month = dateParts[1];
      year = dateParts[2];
    }
    this.migDataService.loadMIGPatientTrace(this.surname.nativeElement.value, this.legalGender, day,month,year)
        .then(patientTrace => this.migPatientTraceSuccess(patientTrace))
        .catch(error => this.migPatientTraceFailed(error));
  }

  private processPatientTraceResults(patientTraceResults:MIGPatientTrace): void {
    let ptr = patientTraceResults;
    if (ptr.status && ptr.patientMatchs.length>0) {
      for (let patient in ptr.patientMatchs) {
        //console.log(ptr.patientMatchs[patient]);
      }
    }
  }

  private migPatientTraceSuccess(patientTrace: MIGPatientTrace): void
  {
    if (patientTrace !== null) {
      this.processPatientTraceResults(patientTrace);
    }
    else {
      //console.log('patient trace succeeded but no data:' + patientTrace.status);
    }
  }

  private migPatientTraceFailed(patientTrace: MIGPatientTrace): void
  {
    //console.log('patient trace failed:' + patientTrace.status);
    this.possibleNHSMatches = [];
  }

  public saveNewFamilyMember(event) {
    let id = this.familyMemberToEdit.id;
    let firstName = this.firstName.nativeElement.value;
    let surname = this.surname.nativeElement.value;
    let dateOfBirth = this.dateOfBirth.nativeElement.value;
    let gender = this.legalGender;
    let nhsNumber = this.nhsNumber.nativeElement.value;
    let role = this.role.nativeElement.value;
    let newFamilyMember = new FamilyMember(id,firstName,surname,dateOfBirth,gender,nhsNumber,role);
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
    let editedFamilyMember = new FamilyMember(id,firstName,surname,dateOfBirth,gender,nhsNumber,role);
    this.editedFamilyMemberSaver.emit(editedFamilyMember);
    this.doPatientTrace();
  }
}

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

@Component({
  selector: 'cnstll-family-member-details-form',
  templateUrl: './family-member-details-form.component.html',
  styleUrls: ['./family-member-details-form.component.scss']
})
export class FamilyMemberDetailsFormComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('surname') surname: ElementRef;
  @ViewChild('dateOfBirth') dateOfBirth: ElementRef;
  @ViewChild('gender') gender: ElementRef;
  @ViewChild('role') role: ElementRef;
  @ViewChild('nhsNumber') nhsNumber: ElementRef;

  @Input()
  public editing: any = false;

  @Input()
  public familyMemberToEdit: FamilyMember;

  @Output()
  public newFamilyMemberSaver: EventEmitter<FamilyMember> = new EventEmitter<FamilyMember>();

  @Output()
  public editedFamilyMemberSaver: EventEmitter<FamilyMember> = new EventEmitter<FamilyMember>();

  constructor() {
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
        this.gender.nativeElement.value = this.familyMemberToEdit.gender;
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

  public saveNewFamilyMember(event) {
    let id = this.familyMemberToEdit.id;
    let firstName = this.firstName.nativeElement.value;
    let surname = this.surname.nativeElement.value;
    let dateOfBirth = this.dateOfBirth.nativeElement.value;
    let gender = this.gender.nativeElement.value;
    let nhsNumber = this.nhsNumber.nativeElement.value;
    let role = this.role.nativeElement.value;
    let newFamilyMember = new FamilyMember(id,firstName,surname,dateOfBirth,gender,nhsNumber,role);
    this.newFamilyMemberSaver.emit(newFamilyMember);
  }

  public saveEditedFamilyMember(event) {
    let id = this.familyMemberToEdit.id;
    let firstName = this.firstName.nativeElement.value;
    let surname = this.surname.nativeElement.value;
    let dateOfBirth = this.dateOfBirth.nativeElement.value;
    let gender = this.gender.nativeElement.value;
    let nhsNumber = this.nhsNumber.nativeElement.value;
    let role = this.role.nativeElement.value;
    let editedFamilyMember = new FamilyMember(id,firstName,surname,dateOfBirth,gender,nhsNumber,role);
    this.editedFamilyMemberSaver.emit(editedFamilyMember);
  }
}

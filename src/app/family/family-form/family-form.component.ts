import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import {FamilyMember} from '../family-member';
import {Family} from '../family';

@Component({
  selector: 'cnstll-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss']
})
export class FamilyFormComponent implements OnInit, OnChanges, AfterViewInit {

  // the case ID
  @ViewChild('id') id: ElementRef;

  @Input()
  public familyToEdit: Family;

  @Input()
  public editing: any = false;

  @Output()
  public newFamilySaver: EventEmitter<Family> = new EventEmitter<Family>();

  @Output()
  public editedFamilySaver: EventEmitter<Family> = new EventEmitter<Family>();

  public currentlyEditingFamilyMember: FamilyMember;
  private indexOfCurrentlyEditingFamilyMember: number = -1;

  private isCurrentlyEditingFamilyMemberNew() {
    return (this.indexOfCurrentlyEditingFamilyMember == -1);
  }

  public newFamilyMemberSaved(familyMember: FamilyMember) {
    this.familyToEdit.familyMembers.push(familyMember);
    this.currentlyEditingFamilyMember = null;
  }

  public editedFamilyMemberSaved(familyMember: FamilyMember) {
    this.currentlyEditingFamilyMember = null;
    this.familyToEdit.familyMembers[this.indexOfCurrentlyEditingFamilyMember] = familyMember;
    this.indexOfCurrentlyEditingFamilyMember = -1;
  }

  public addFamilyMember() {
    let newFamilyMember = new FamilyMember({});
    this.currentlyEditingFamilyMember = newFamilyMember;
    this.indexOfCurrentlyEditingFamilyMember = -1;
  }

  public editFamilyMember(index: number, familyMember: FamilyMember) {
    this.currentlyEditingFamilyMember = familyMember;
    this.indexOfCurrentlyEditingFamilyMember = index;
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    if (this.familyToEdit && this.familyToEdit.id) {
      this.id.nativeElement.value = this.familyToEdit.id;
    }
  }

  public saveFamily(event) {
    if (this.editing) {
      this.saveEditedFamily(event);
    }
    else {
      this.saveNewFamily(event);
    }
  }

  public saveNewFamily(event) {
    let id = this.id.nativeElement.value;
    let newFamilyMembers: FamilyMember[] = [];
    for (let member of this.familyToEdit.familyMembers) {
      newFamilyMembers.push(member);
    }
    let newFamily = new Family({
      id: id,
      familyMembers: newFamilyMembers
    });
    this.newFamilySaver.emit(newFamily);
  }

  public saveEditedFamily(event) {
    let id = this.id.nativeElement.value;
    let newFamilyMembers: FamilyMember[] = [];
    for (let member of this.familyToEdit.familyMembers) {
      newFamilyMembers.push(member);
    }
    let editedFamily = new Family({
      id: id,
      familyMembers: newFamilyMembers
    });
    this.editedFamilySaver.emit(editedFamily);
  }

}

// TODO clean up the FamilyName HTML element in the form, possibly unneeded checks present now?

/*
 Old code for if we need to make family name editable
 <p>
 <label for="name">Family Name:</label>
 <input #name disabled="disabled" type="text" id="name" value=""/>
 </p>

 */

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
import {HasConsentsService} from '../../consent/has-consents.service';

@Component({
  selector: 'cnstll-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss']
})
export class FamilyFormComponent implements OnInit, OnChanges, AfterViewInit {

  // the case ID
  @ViewChild('id') id: ElementRef;

  private enteredID: string;

  private savedID: string;

  @Input()
  public caseIDSaved: boolean = true; // when the case ID has been saved, it cannot be changed, as consents are tied to it.

  @Input()
  public family: Family;

  @Input()
  public indexOfFamily: number = -1; // used for deleting the family

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public mode: string = 'cases';

  @Input()
  public editing: any = false;

  @Output()
  public newFamilySaver: EventEmitter<Family> = new EventEmitter<Family>();

  @Output()
  public editedFamilySaver: EventEmitter<Family> = new EventEmitter<Family>();

  @Output()
  public familyDeleter: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public hasConsents = {}; // for each family member, one of "unknown", "true" or "false"

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public inspectFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  public doSelectFamilyAndFamilyMember(familyMember: FamilyMember): void {
    this.selectFamilyAndFamilyMember.emit({
      family: this.family,
      familyMember: familyMember
    });
  }

  public doInspectFamilyMember(familyAndFamilyMember): void {
    this.inspectFamilyMember.emit({
      family: familyAndFamilyMember.family,
      familyMember: familyAndFamilyMember.familyMember
    });
  }

  public closePanel() {
    this.close.emit(null);
  }

  constructor(private hasConsentsService: HasConsentsService) {

  }

  private hasConsentsSuccessHandler(response) {
    this.hasConsents[response.nhsNumber] = response.hasConsents;
  }

  private hasConsentsErrorHandler(response) {
    console.error(response.error);
    this.hasConsents[response.nhsNumber] = "unknown";
  }

  private checkConsents() {
    for (let familyMember of this.family.familyMembers) {
      let nhsNumber = parseInt(familyMember.nhsNumber);
      if (nhsNumber && nhsNumber > 0) {
        this.hasConsentsService.hasConsentForThisCase(familyMember.nhsNumber,this.savedID)
          .then((response: any) => this.hasConsentsSuccessHandler(response))
          .catch((error) => this.hasConsentsErrorHandler(error));
      }
    }
  }

  private saveCaseID() {
    this.caseIDSaved = true;
    let id = this.id.nativeElement.value;
    this.savedID = id;
    let newFamily = new Family({
      id: id,
      familyMembers: []
    });
    this.newFamilySaver.emit(newFamily);
  }

  // a.k.a. close case. Will revoke all members' consents first
  private deleteFamily() {
    this.familyDeleter.emit(this.family.id);
  }

  private isCreateCaseButtonDisabled() {
    if (!this.enteredID || this.enteredID =="" || this.enteredID.length==0) {
      return true;
    } else {
      return false;
    }
  }

  private deleteFamilyMember(editedFamily) {
    this.family = editedFamily;
    this.editedFamilySaver.emit(this.family);
  }

  ngOnInit() {
    for (let familyMember of this.family.familyMembers) {
      this.hasConsents[familyMember.nhsNumber] = "unknown";
    }
  }

  ngAfterViewInit() {
    this.savedID = this.id.nativeElement.value;
    this.checkConsents();
  }

  ngOnChanges() {
    this.checkConsents();
  }

  private caseIDChanged() {
    this.enteredID = this.id.nativeElement.value;
  }

  public currentlyEditingFamilyMember: FamilyMember;
  private indexOfCurrentlyEditingFamilyMember: number = -1;

  private isCurrentlyEditingFamilyMemberNew() {
    return (this.indexOfCurrentlyEditingFamilyMember == -1);
  }

  public newFamilyMemberSaved(familyMember: FamilyMember) {
    this.family.familyMembers.push(familyMember);
    this.currentlyEditingFamilyMember = null;
    this.editedFamilySaver.emit(this.family);
  }

  public editedFamilyMemberSaved(familyMember: FamilyMember) {
    this.currentlyEditingFamilyMember = null;
    this.family.familyMembers[this.indexOfCurrentlyEditingFamilyMember] = familyMember;
    this.indexOfCurrentlyEditingFamilyMember = -1;
    this.editedFamilySaver.emit(this.family);
  }

  public familyMemberClosed(family:Family) {
    this.currentlyEditingFamilyMember = null;
    this.family=family;
    this.indexOfCurrentlyEditingFamilyMember = -1;
    this.mode='cases';
    this.checkConsents();
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

  public editConsent(index: number, familyMember: FamilyMember) {
    this.currentlyEditingFamilyMember = familyMember;
    this.indexOfCurrentlyEditingFamilyMember = index;
    this.mode='consent';
  }

  public viewHistory(index: number, familyMember: FamilyMember) {
    this.currentlyEditingFamilyMember = familyMember;
    this.indexOfCurrentlyEditingFamilyMember = index;
    this.mode='history';
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
    for (let member of this.family.familyMembers) {
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
    for (let member of this.family.familyMembers) {
      newFamilyMembers.push(member);
    }
    let editedFamily = new Family({
      id: id,
      familyMembers: newFamilyMembers
    });
    this.editedFamilySaver.emit(editedFamily);
  }

}

/*
 Old code for if we need to make family name editable
 <p>
 <label for="name">Family Name:</label>
 <input #name disabled="disabled" type="text" id="name" value=""/>
 </p>

 */

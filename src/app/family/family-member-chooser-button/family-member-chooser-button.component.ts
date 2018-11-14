import {Component, Output, Input, OnInit, OnChanges, ViewEncapsulation, EventEmitter} from '@angular/core';

import {Family} from '../family';
import {FamilyMember} from '../family-member';

@Component
({
  selector: 'cnstll-family-member-chooser-button',
  templateUrl: 'family-member-chooser-button.component.html',
  styleUrls: ['family-member-chooser-button.component.scss']
})

export class FamilyMemberChooserButtonComponent implements OnInit, OnChanges {
  @Input()
  public family: Family = null;

  @Input()
  public familyMember: FamilyMember;

  public familyName: string = '';
  public memberName: string = '';
  public loading: boolean = false;

  @Output()
  public selectFamilyMember: EventEmitter<FamilyMember> = new EventEmitter<FamilyMember>();

  public constructor() { }

  public ngOnInit() {
    if (this.familyMember)
      this.memberName = this.familyMember.getFullName();
    this.doShowFamily();
  }

  public ngOnChanges() {
    if (this.familyMember)
      this.memberName = this.familyMember.getFullName();
    this.doShowFamily();
  }

  private doShowFamily(): void {
    if (this.family)
      this.familyName = this.family.getFamilyName();
    else
      this.familyName = '';
    if (this.familyMember)
      this.memberName = this.familyMember.getFullName();
    else
      this.memberName = '';
    this.loading = false;
  }

  public doSelectFamilyMember(familyMember: FamilyMember): void {
    //console.log('NHS Number: ' + familyMember.nhsNumber);
    if (familyMember) {
      this.familyMember = familyMember;
      this.memberName = familyMember.getFullName();
    }
    else
      this.familyMember = null;
      this.memberName = '';
    this.selectFamilyMember.emit(this.familyMember);
  }
}

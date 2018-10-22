import {Component, Output, Input, OnInit, OnChanges, ViewEncapsulation, EventEmitter} from '@angular/core';

import {Family} from '../family';
import {FamilyMember} from '../family-member';

@Component
({
  selector: 'cnstll-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})

export class FamilyComponent implements OnInit, OnChanges {
  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  public familyName: string;
  public memberName: string;
  public loading: boolean;

  @Output()
  public selectFamilyMember: EventEmitter<FamilyMember>;

  public constructor() {
    this.family = null;
    this.familyName = '';
    this.memberName = '';
    this.loading = false;
    this.selectFamilyMember = new EventEmitter<FamilyMember>();
  }

  public ngOnInit() {
    if (this.familyMember && this.memberName=='')
      this.memberName = this.familyMember.getFullName();
    this.doShowFamily();
  }

  public ngOnChanges() {
    if (this.familyMember && this.memberName=='')
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

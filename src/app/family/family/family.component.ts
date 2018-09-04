import {Component, Output, ViewEncapsulation, EventEmitter} from '@angular/core';

import {Family} from '../family';
import {FamilyMember} from '../family-member';

@Component
({
  selector: 'cnstll-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})

export class FamilyComponent {
  public family: Family;
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

  public doShowLoading(): void {
    this.loading = true;
  }

  public doShowFamily(family: Family): void {
    this.family = family;
    if (family)
      this.familyName = family.getFamilyName();
    else
      this.familyName = '';
    this.memberName = '';
    this.loading = false;
  }

  public doSelectFamilyMember(familyMember: FamilyMember): void {
    //console.log('NHS Number: ' + familyMember.nhsNumber);
    if (familyMember) {
      this.memberName = familyMember.getFullName();
    }
    else
      this.memberName = '';
    this.selectFamilyMember.emit(familyMember);
  }
}

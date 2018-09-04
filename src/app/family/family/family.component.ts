import {Component, Output, ViewChild, EventEmitter} from '@angular/core';

import {MatExpansionPanel} from '@angular/material/expansion';

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

  @ViewChild('expansionpanel')
  public expansionPanel: MatExpansionPanel;

  @Output()
  public closeSelect: EventEmitter<void>;

  @Output()
  public selectFamilyMember: EventEmitter<FamilyMember>;

  public constructor() {
    this.family = null;
    this.familyName = '';
    this.memberName = '';
    this.loading = false;
    this.closeSelect = new EventEmitter<void>();
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

    if (this.expansionPanel)
      this.expansionPanel.open();
  }

  public doSelectFamilyMember(familyMember: FamilyMember): void {
    //console.log('NHS Number: ' + familyMember.nhsNumber);
    if (familyMember) {
      this.memberName = familyMember.getFullName();
    }
    else
      this.memberName = '';
    this.selectFamilyMember.emit(familyMember);
    this.expansionPanel.close();
    this.closeSelect.emit();
  }
}

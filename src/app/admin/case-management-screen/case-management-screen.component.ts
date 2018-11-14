import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FamilyMember } from '../../family/family-member';

@Component({
  selector: 'cnstll-case-management-screen',
  templateUrl: './case-management-screen.component.html',
  styleUrls: ['./case-management-screen.component.scss']
})
export class CaseManagementScreenComponent implements OnInit {

  @Input()
  public username: string;

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  public doSelectFamilyAndFamilyMember(familyAndFamilyMember): void {
    this.selectFamilyAndFamilyMember.emit({
      family: familyAndFamilyMember.family,
      familyMember: familyAndFamilyMember.familyMember
    });
  }

  constructor() { }

  ngOnInit() {
  }

}

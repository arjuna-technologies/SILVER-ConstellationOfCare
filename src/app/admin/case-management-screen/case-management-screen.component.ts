import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Family } from '../../family/family';
import { FamilyMember } from '../../family/family-member';

@Component({
  selector: 'cnstll-case-management-screen',
  templateUrl: './case-management-screen.component.html',
  styleUrls: ['./case-management-screen.component.scss']
})
export class CaseManagementScreenComponent implements OnInit {

  @Input()
  public username: string;

  @Input()
  public mode: string = 'view';

  @Input()
  public families: Family[];

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public selectFamilyOnly: EventEmitter<Family> = new EventEmitter<Family>();

  @Output()
  public updateFamilies: EventEmitter<Family[]> = new EventEmitter<Family[]>();

  @Output()
  public selectEditMode: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public selectViewMode: EventEmitter<any> = new EventEmitter<any>();

  public doSelectFamilyAndFamilyMember(familyAndFamilyMember): void {
    this.selectFamilyAndFamilyMember.emit({
      family: familyAndFamilyMember.family,
      familyMember: familyAndFamilyMember.familyMember
    });
  }

  public doSelectFamilyOnly(family): void {
    this.selectFamilyOnly.emit(family);
  }

  public doSelectEditMode(): void {
    this.selectEditMode.emit();
  }

  public doSelectViewMode(): void {
    this.selectViewMode.emit();
  }

  public doUpdateFamilies(families): void {
    this.updateFamilies.emit(families);
  }

  constructor() { }

  ngOnInit() {
  }

}

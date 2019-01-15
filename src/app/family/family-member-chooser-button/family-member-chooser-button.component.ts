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
  public families: Family[];

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public mode: string = 'cases';

  public loading: boolean = false;

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public selectFamilyOnly: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public inspectFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  public constructor() {
  }

  public ngOnInit() {
    this.doShowFamily();
  }

  public ngOnChanges() {
    this.doShowFamily();
  }

  private doShowFamily(): void {
    this.loading = false;
  }

  public doSelectFamilyOnly(family): void {
    this.selectFamilyOnly.emit(family);
  }

  public doInspectFamilyMember(familyAndFamilyMember): void {
    this.inspectFamilyMember.emit({
      family: familyAndFamilyMember.family,
      familyMember: familyAndFamilyMember.familyMember
    });
  }
}

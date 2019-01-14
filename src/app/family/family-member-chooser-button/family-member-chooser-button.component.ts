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
  public families: Family[] = null;

  @Input()
  public family: Family = null;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public mode: string = 'view';

  public loading: boolean = false;

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  public constructor() { }

  public ngOnInit() {
    this.doShowFamily();
  }

  public ngOnChanges() {
    this.doShowFamily();
  }

  private doShowFamily(): void {
    this.loading = false;
  }

  public doSelectFamilyAndFamilyMember(familyAndFamilyMember: any): void {
    this.selectFamilyAndFamilyMember.emit({
      family: familyAndFamilyMember.family,
      familyMember: familyAndFamilyMember.familyMember
    });
  }
}

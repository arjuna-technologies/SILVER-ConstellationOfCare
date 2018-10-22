import {Component, Input, Output, OnChanges, ViewEncapsulation, SimpleChanges, EventEmitter} from '@angular/core';

import {FamilyMember} from '../family-member';

@Component
({
  selector: 'cnstll-family-member-menu-item',
  templateUrl: 'family-member-menu-item.component.html',
  styleUrls: ['family-member-menu-item.component.scss']
})
export class FamilyMemberMenuItemComponent implements OnChanges {
  @Input()
  public familyMember: FamilyMember;
  @Input()
  public loading: boolean;
  @Output()
  public selectFamilyMember: EventEmitter<FamilyMember>;

  public constructor() {
    this.loading = false;

    this.selectFamilyMember = new EventEmitter<FamilyMember>();
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public doSelectNHSNumber(): void {
    if (this.familyMember.nhsNumber !== '')
      this.selectFamilyMember.emit(this.familyMember);
  }
}

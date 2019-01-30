import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';

import {Family} from '../../family/family';
import {FamilyMember} from '../../family/family-member';

@Component({
  selector: 'cnstll-case-management-button',
  templateUrl: './case-management-button.component.html',
  styleUrls: ['./case-management-button.component.scss']
})
export class CaseManagementButtonComponent {

  @Input()
  private families: Family[] = null;

  @Input()
  private family: Family = null;

  @Input()
  private familyMember: FamilyMember = null;

  @Input()
  private mode: string = 'cases';

  @Input()
  private username: string;

  @Output()
  public launchCaseManagementScreen: EventEmitter<string>;

  constructor() {
    this.launchCaseManagementScreen = new EventEmitter<string>();
  }

  public doLaunchCaseManagementScreen(username): void {
    this.launchCaseManagementScreen.emit(username);
  }
}

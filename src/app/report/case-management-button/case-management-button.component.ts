import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cnstll-case-management-button',
  templateUrl: './case-management-button.component.html',
  styleUrls: ['./case-management-button.component.scss']
})
export class CaseManagementButtonComponent {

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

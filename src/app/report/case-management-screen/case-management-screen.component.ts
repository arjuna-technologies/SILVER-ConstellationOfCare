import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'cnstll-case-management-screen',
  templateUrl: './case-management-screen.component.html',
  styleUrls: ['./case-management-screen.component.scss']
})
export class CaseManagementScreenComponent implements OnInit, OnChanges {

  public caseData: any;
  public loading: boolean;

  @Input()
  public username: string;

  constructor() {
    this.username='';
  }

  public ngOnInit() {
    this.doLoadCases();
  }

  public ngOnChanges() {
    this.doLoadCases();
  }

  public doLoadCases() {
    this.caseData = `${this.username}`;
    /*if (caseData != null) {
      this.loading = true;
      // TODO load case data
    }
    else {
      this.loading = false;
      this.caseData = null;
    }*/
  }

}

import {Component, Input, OnInit, Output, EventEmitter, OnChanges, AfterViewInit} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material';
import {HasConsentsService} from '../../consent/has-consents.service';

import {Family}       from '../family';
import {FamilyMember} from '../family-member';

@Component({
  selector: 'cnstll-family-list-panel',
  templateUrl: 'family-list-panel.component.html',
  styleUrls: ['family-list-panel.component.scss']
})
export class FamilyListPanelComponent implements OnInit, OnChanges {

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public mode: string = 'cases';

  @Input()
  public hasConsents = {}; // for each family member, one of "unknown", "true" or "false"

  constructor(private hasConsentsService: HasConsentsService) {

  }

  private checkConsents() {
    for (let familyMember of this.family.familyMembers) {
      let nhsNumber = parseInt(familyMember.nhsNumber);
      if (nhsNumber && nhsNumber > 0) {
        this.hasConsentsService.hasConsents(familyMember.nhsNumber)
          .then((response: any) => this.hasConsentsSuccessHandler(response))
          .catch((error) => this.hasConsentsErrorHandler(error));
      }
    }
  }

  ngOnInit() {
    for (let familyMember of this.family.familyMembers) {
      this.hasConsents[familyMember.nhsNumber] = "unknown";
    }
  }

  ngAfterViewInit() {
    this.checkConsents();
  }

  ngOnChanges() {
    this.checkConsents();
  }

  private hasConsentsSuccessHandler(response) {
    this.hasConsents[response.nhsNumber] = response.hasConsents;
  }

  private hasConsentsErrorHandler(response) {
    console.error(response.error);
    this.hasConsents[response.nhsNumber] = "unknown";
  }

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public inspectFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  public doSelectFamilyAndFamilyMember(familyMember: FamilyMember): void {
    this.selectFamilyAndFamilyMember.emit({
      family: this.family,
      familyMember: familyMember
    });
  }

  public doInspectFamilyMember(familyMember: FamilyMember): void {
    this.inspectFamilyMember.emit({
      family: this.family,
      familyMember: familyMember
    });
  }

  public closePanel() {
    this.close.emit(null);
  }

}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material';

import {Family}       from '../family';
import {FamilyMember} from '../family-member';

@Component({
  selector: 'cnstll-family-list-panel',
  templateUrl: 'family-list-panel.component.html',
  styleUrls: ['family-list-panel.component.scss']
})
export class FamilyListPanelComponent implements OnInit {

  @Input()
  public family:Family;

  constructor() { }

  ngOnInit() {
  }

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  public doSelectFamilyAndFamilyMember(familyMember: FamilyMember): void {
    this.selectFamilyAndFamilyMember.emit({
      family: this.family,
      familyMember: familyMember
    });
  }

  public closePanel() {
    this.close.emit(null);
  }

}

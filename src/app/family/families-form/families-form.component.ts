import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Family } from '../family';
import { FamilyMember } from '../family-member';

import {FamilyDataService} from '../family-data.service';
import { MatGridList, MatGridTile } from '@angular/material';

@Component({
  selector: 'cnstll-families-form',
  templateUrl: './families-form.component.html',
  styleUrls: ['./families-form.component.scss']
})
export class FamiliesFormComponent implements OnInit, OnChanges {

  public families: Family[] = [];

  private expanded: any[] = [];

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  public doSelectFamilyAndFamilyMember(familyAndFamilyMember): void {
    this.selectFamilyAndFamilyMember.emit({
      family: familyAndFamilyMember.family,
      familyMember: familyAndFamilyMember.familyMember
    });
  }

  public toggleExpanded(index) {
    if (this.expanded[index]==false) {
      this.expanded[index] = true;
    } else {
      this.expanded[index] = false;
    }
  }

  constructor(private familyDataService: FamilyDataService) {

  }

  private getNewFamilyID() {
    let n = this.families.length;
    n += 1;
    return `C${n}`;
  }

  public currentlyEditingFamily: Family = null

  private indexOfCurrentlyEditingFamily: number = -1;

  private isCurrentFamilyNew() {
    return (this.indexOfCurrentlyEditingFamily==-1);
  }

  public addFamily() {
    let members : FamilyMember[] = [];
    let newFamily = new Family(this.getNewFamilyID(), members);
    this.currentlyEditingFamily = newFamily;
    this.indexOfCurrentlyEditingFamily = -1;
  }

  public editFamily(index) {
    this.currentlyEditingFamily = this.families[index];
    this.indexOfCurrentlyEditingFamily = index;
  }

  public newFamilySaved(family:Family) {
    this.currentlyEditingFamily = null;
    this.families.push(family);
    this.familyDataService.saveFamilies(this.families);
  }

  public editedFamilySaved(family:Family) {
    this.currentlyEditingFamily = null;
    this.families[this.indexOfCurrentlyEditingFamily]=family;
    this.indexOfCurrentlyEditingFamily=-1;
    this.familyDataService.saveFamilies(this.families);
  }

  private initialiseExpandedFlags() {
    for (let family in this.families) {
      this.expanded.push(false);
    }
  }

  ngOnInit() {
    this.loadFamilies();
  }

  ngOnChanges() {
  }

  private loadFamilies(): void {
    this.familyDataService.loadFamilies()
      .then(families => this.loadFamiliesSuccess(families))
      .catch(error => this.loadFamiliesFailed(error));
  }

  private loadFamiliesSuccess(families: Family[]): void {
    this.families = families;
    this.initialiseExpandedFlags();
  }

  private loadFamiliesFailed(error: any): void {
    this.families = [];
    this.initialiseExpandedFlags();
  }

}

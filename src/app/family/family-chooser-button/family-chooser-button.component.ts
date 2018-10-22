import {Component, OnInit, ViewEncapsulation, Input, OnChanges, Output, EventEmitter} from '@angular/core';

import {Family}       from '../family';
import {FamilyMember} from '../family-member';

import {FamilyDataService} from '../family-data.service';

@Component
({
  selector: 'cnstll-family-chooser-button',
  templateUrl: 'family-chooser-button.component.html',
  styleUrls: ['family-chooser-button.component.scss']
})
export class FamilyChooserButtonComponent implements OnInit, OnChanges {
  public families: Family[];
  public familyNames: string[];

  @Input()
  public family: Family;

  public loading: boolean;

  @Output()
  public familySelect: EventEmitter<Family>;

  public constructor(private familyDataService: FamilyDataService) {
    this.families = null;
    this.familyNames = [];
    this.family = null;
    this.loading = true;
    this.familySelect = new EventEmitter<Family>();
  }

  public ngOnInit(): void {
    this.familyNames = [];

    this.families = null;
    this.loading = true;

    this.loadFamilies();
  }

  public ngOnChanges(): void {
    this.familyNames = [];

    this.families = null;
    this.loading = true;

    this.loadFamilies();
  }

  public doFamilySelect(familyId: string): void {
    this.loadFamily(familyId);
  }

  private loadFamilies(): void {
    this.loading = true;

    this.familyDataService.loadFamilies()
      .then(families => this.loadFamiliesSuccess(families))
      .catch(error => this.loadFamiliesFailed(error));
  }

  private loadFamiliesSuccess(families: Family[]): void {
    this.familyNames = [];

    this.families = families;
    this.loading = false;

    for (let family of families)
      this.familyNames.push(this.generateFamilyName(family.familyMembers));
  }

  private loadFamiliesFailed(error: any): void {
    this.familyNames = [];

    this.families = null;
    this.loading = false;
  }

  private loadFamily(familyId: string): void {
    this.loading = true;

    this.familyDataService.loadFamily(familyId)
      .then(family => this.loadFamilySuccess(family))
      .catch(error => this.loadFamilyFailed(error));
  }

  private loadFamilySuccess(family: Family): void {
    this.family = family;
    this.loading = false;

    this.familySelect.emit(family);
  }

  private loadFamilyFailed(error: any): void {
    this.family = null;
    this.loading = false;

    this.familySelect.emit(null);
  }

  private generateFamilyName(familyMembers: FamilyMember[]): string {
    let surnames: string[] = [];

    for (let familyMember of familyMembers)
      surnames.push(familyMember.surname);

    surnames.sort();

    let surnameIndex = 0;
    while (surnameIndex < surnames.length - 1)
      if (surnames[surnameIndex] === surnames[surnameIndex + 1])
        surnames.splice(surnameIndex, 1);
      else
        surnameIndex++;

    let concatSurnames = '';
    for (let surnameIndex = 0; surnameIndex < surnames.length; surnameIndex++)
      if (surnameIndex === 0)
        concatSurnames = surnames[surnameIndex];
      else
        concatSurnames = concatSurnames.concat('/', surnames[surnameIndex]);

    return concatSurnames;
  }
}

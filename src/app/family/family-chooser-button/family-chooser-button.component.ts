import {Component, OnInit, ViewEncapsulation, Input, OnChanges, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

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
  public families: Family[]= [];
  public familyNames: string[]= [];

  @Input()
  public family: Family = null;

  @Input()
  public username: string;

  @ViewChild("familyNameButton")
  public familyNameButton: ElementRef;

  public loading: boolean = true;

  @Output()
  public familySelect: EventEmitter<Family> = new EventEmitter<Family>();

  public constructor(private familyDataService: FamilyDataService) {

  }

  public ngOnInit(): void {
    this.familyNames = [];

    this.families = [];
    this.loading = true;

    this.loadFamilies();
  }

  public ngOnChanges(): void {
    this.familyNames = [];

    this.families = [];
    this.loading = true;

    this.loadFamilies();
  }

  public doFamilySelect(familyId: string): void {
    this.loadFamily(familyId);
  }

  private loadFamilies(): void {
    this.loading = true;

    this.familyDataService.loadFamilies(this.username)
      .then(families => this.loadFamiliesSuccess(families))
      .catch(error => this.loadFamiliesFailed(error));
  }

  private loadFamiliesSuccess(families: Family[]): void {
    this.familyNames = [];

    this.families = families;
    this.loading = false;

    for (let family of families)
      this.familyNames.push(family.getFamilyName());
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
}

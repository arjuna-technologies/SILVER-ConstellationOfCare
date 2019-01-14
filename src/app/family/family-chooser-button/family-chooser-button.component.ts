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

  @Input()
  public families: Family[]= [];

  @Input()
  public family: Family = null;

  @Input()
  public familyMember: FamilyMember = null;

  @Input()
  public mode: string = 'view';

  @Input()
  public username: string;

  @ViewChild("familyNameButton")
  public familyNameButton: ElementRef;

  public loading: boolean = true;

  @Output()
  public selectFamilyOnly: EventEmitter<Family> = new EventEmitter<Family>();

  public constructor(private familyDataService: FamilyDataService) {

  }

  public ngOnInit(): void {

  }

  public ngOnChanges(): void {

  }

  public doFamilySelect(familyId: string): void {
    this.loadFamily(familyId);
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

    console.log('load success of family',family);
    this.selectFamilyOnly.emit(family);
    console.log('emitted',family);
  }

  private loadFamilyFailed(error: any): void {
    this.family = null;
    this.loading = false;

    this.selectFamilyOnly.emit(null);
  }
}

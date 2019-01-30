import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

import {Family}       from '../family';
import {FamilyMember} from '../family-member';

@Component
({
  selector: 'cnstll-family-chooser-button',
  templateUrl: 'family-chooser-button.component.html',
  styleUrls: ['family-chooser-button.component.scss']
})
export class FamilyChooserButtonComponent implements OnInit, OnChanges {

  @Input()
  public families: Family[];

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public mode: string = 'cases';

  @Input()
  public username: string;

  @ViewChild("familyNameButton")
  public familyNameButton: ElementRef;

  public loading: boolean = true;

  @Output()
  public selectFamilyOnly: EventEmitter<Family> = new EventEmitter<Family>();

  public constructor() {

  }

  public ngOnInit(): void {

  }

  public ngOnChanges(): void {

  }

  public doFamilySelect(family): void {
    this.selectFamilyOnly.emit(family);
  }

}

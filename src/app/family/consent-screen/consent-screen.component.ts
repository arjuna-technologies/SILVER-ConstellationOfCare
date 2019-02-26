import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Family} from '../family';
import {FamilyMember} from '../family-member';
import {ConsentsService} from '../../consent/consents.service';

@Component({
  selector: 'cnstll-consent-screen',
  templateUrl: './consent-screen.component.html',
  styleUrls: ['./consent-screen.component.scss']
})
export class ConsentScreenComponent implements OnInit {

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public consented: boolean = false;

  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  constructor(private consentsService: ConsentsService) { }

  ngOnInit() {
  }

  private recordConsent() {
    let nhsNumber = this.familyMember.nhsNumber;
    this.consentsService.createConsentRecord(nhsNumber,this.family.id);
    this.consented = true;
  }

  private revokeConsent() {
    let nhsNumber = this.familyMember.nhsNumber;
    this.consentsService.revokeConsentRecord(nhsNumber,this.family.id);
    this.consented = false;
  }

  private closePanel() {
    this.close.emit(this.family);
  }
}

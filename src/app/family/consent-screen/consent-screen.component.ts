import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FamilyMember} from '../family-member';
import {ConsentsService} from '../../consent/consents.service';

@Component({
  selector: 'cnstll-consent-screen',
  templateUrl: './consent-screen.component.html',
  styleUrls: ['./consent-screen.component.scss']
})
export class ConsentScreenComponent implements OnInit {

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public consented: boolean = false;

  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  constructor(private consentsService: ConsentsService) { }

  ngOnInit() {
    console.log('initialising consent screen, with consented equal to '+this.consented);
  }

  private recordConsent() {
    let nhsNumber = this.familyMember.nhsNumber;
    this.consentsService.createConsentRecord(nhsNumber);
    this.consented = true;
  }

  private revokeConsent() {
    let nhsNumber = this.familyMember.nhsNumber;
    this.consentsService.revokeConsentRecord(nhsNumber);
    this.consented = false;
  }

  private closePanel() {
    this.close.emit(null);
  }
}

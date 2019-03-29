import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Family} from '../family';
import {FamilyMember} from '../family-member';
import {ConsentsService} from '../../consent/consents.service';

@Component({
  selector: 'cnstll-consent-history-screen',
  templateUrl: './consent-history-screen.component.html',
  styleUrls: ['./consent-history-screen.component.scss']
})
export class ConsentHistoryScreenComponent implements OnInit {

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public consented: boolean = false;

  @Input()
  public caseID: string;

  private history: any = null;

  public otherConsentedCaseIDs: string[] = [];

  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  constructor(private consentsService: ConsentsService) { }

  private getCaseIDFromName(name:string) {
    let caseID = '';
    let openBracket = name.indexOf('[');
    let closeBracket = name.indexOf(']');
    if (openBracket >-1 && closeBracket >-1) {
      caseID = name.substring(openBracket+1,closeBracket);
    }
    return caseID;
  }

  private niceTime(time:any) {
    let str = time.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " at ");
    // now flip the date part
    let dateParts = str.split(" at ");
    let firstPart = dateParts[0];
    let firstPartParts = firstPart.split('/');
    console.log(firstPartParts);
    return `${firstPartParts[2]}/${firstPartParts[1]}/${firstPartParts[0]} at ${dateParts[1]}`;
  }

  ngOnInit() {
    let main=this;
    this.consentsService.getConsentHistory(this.familyMember.nhsNumber,this.caseID).then(function(response) {
      main.history = [];
      for (let consent of response.response) {
        if (consent.name.indexOf("SILVER Family Data Interface Consent")) {
          let consent_object = {
            caseID: main.getCaseIDFromName(consent.name),
            created: main.niceTime(new Date(consent.createddate)),
            modified: main.niceTime(new Date(consent.lastmodifieddate)),
            events: []
          };
          for (let i in consent.history.events) {
            let source_event = consent.history.events[i];
            let output_event = {
              type: source_event.eventtype,
              time: main.niceTime(new Date(source_event.timestamp)),
              organisation: source_event.info['Organisation Name'],
              authorising_user: source_event.info['Requester Name']
            };
            consent_object.events.push(output_event);
          }
          main.history.push(consent_object);
        }
      }
    });
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

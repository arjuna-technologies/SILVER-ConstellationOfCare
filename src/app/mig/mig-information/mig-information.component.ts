import {Component, OnInit, Input, OnChanges, ViewChild, EventEmitter, Output}             from '@angular/core';
import {MatPaginator, MatTabGroup, MatTab, MatTableDataSource} from '@angular/material';

import {MIGDataService}             from '../mig-data.service';
import {MIGInformationIndexService} from '../mig-information-index.service';
import {Family} from '../../family/family';
import {FamilyMember} from '../../family/family-member';
import {MIGInformation} from '../mig-information';
import {MIGUnifiedEvent} from '../mig-unified-event';

@Component
({
  selector: 'cnstll-mig-information',
  templateUrl: './mig-information.component.html',
  styleUrls: ['./mig-information.component.scss']
})
export class MIGInformationComponent implements OnInit, OnChanges {
  public information: MIGInformation;

  public unified_events: MIGUnifiedEvent[] = [];

  @Input()
  public families: Family[];

  @Input()
  public family: Family;

  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public mode: string = 'cases';

  public format: string;
  public loading: boolean;

  public constructor(private migDataService: MIGDataService, private migInformationIndexService: MIGInformationIndexService) {
    this.format = 'report';
    this.loading = false;
  }

  public ngOnInit() {
    this.doLoadInformation(this.familyMember);
  }

  public ngOnChanges() {
    this.doLoadInformation(this.familyMember);
  }

  private doLoadInformation(familyMember: FamilyMember) {
    if (familyMember != null) {
      this.loading = true;
      this.information = null;
      this.familyMember = familyMember;
      this.migDataService.loadMIGInformation(familyMember.nhsNumber, MIGDataService.ALLGPDATA_REQUEST_NAME)
        .then((migInformation: MIGInformation) => this.doLoadInformationSuccessHandler(migInformation))
        .catch((error) => this.doLoadInformationErrorHandler(error));
    }
    else {
      this.loading = false;
      this.familyMember = null;
      this.family = null;
      this.information = null;
    }
  }

  private createUnifiedEvents(migInformation:MIGInformation) {
    let unified_events = [];
    for (let problem of migInformation.problems) {
      let event = MIGUnifiedEvent.createFromProblem(this.migInformationIndexService,problem);
      unified_events.push(event);
    }
    for (let encounter of migInformation.encounters) {
      let events = MIGUnifiedEvent.createFromEncounter(this.migInformationIndexService,encounter);
      unified_events = unified_events.concat(events);
    }
    unified_events.sort(function(event1,event2){return event2.startTime - event1.startTime});
    this.unified_events = unified_events;
  }

  private doLoadInformationSuccessHandler(migInformation: MIGInformation) {
    this.information = migInformation;
    this.loading = false;

    this.migInformationIndexService.createIndexes(migInformation);

    this.createUnifiedEvents(migInformation);
  }

  private doLoadInformationErrorHandler(error: any) {
    this.information = null;
    this.loading = false;

    this.migInformationIndexService.createIndexes(null);
  }

  public closePanel() {
    this.close.emit(this.family);
  }

}

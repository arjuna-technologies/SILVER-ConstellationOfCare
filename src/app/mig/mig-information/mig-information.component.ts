import {Component, OnInit, Input, OnChanges, ViewChild}             from '@angular/core';
import {MatPaginator, MatTabGroup, MatTab, MatTableDataSource} from '@angular/material';

import {MIGDataService}             from '../mig-data.service';
import {MIGInformationIndexService} from '../mig-information-index.service';
import {Family} from '../../family/family';
import {FamilyMember} from '../../family/family-member';
import {MIGInformation} from '../mig-information';

@Component
({
  selector: 'cnstll-mig-information',
  templateUrl: './mig-information.component.html',
  styleUrls: ['./mig-information.component.scss']
})
export class MIGInformationComponent implements OnInit, OnChanges {
  public information: MIGInformation;

  @Input()
  public families: Family[];

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public mode: string = 'cases';

  public format: string;
  public loading: boolean;

  public constructor(private migDataService: MIGDataService, private migInformationIndexService: MIGInformationIndexService) {
    this.information = null;
    this.familyMember = null;
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
      this.information = null;
    }
  }

  private doLoadInformationSuccessHandler(migInformation: MIGInformation) {
    this.information = migInformation;
    this.loading = false;

    this.migInformationIndexService.createIndexes(migInformation);
  }

  private doLoadInformationErrorHandler(error: any) {
    this.information = null;
    this.loading = false;

    this.migInformationIndexService.createIndexes(null);
  }
}

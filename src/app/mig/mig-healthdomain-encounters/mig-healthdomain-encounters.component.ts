import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';
import { MIGInformationIndexService } from '../mig-information-index.service';
import { MIGEncounter } from '../mig-encounter';

@Component
({
    selector:    'cnstll-mig-healthdomain-encounters',
    templateUrl: './mig-healthdomain-encounters.component.html',
    styleUrls:   ['./mig-healthdomain-encounters.component.scss']
})
export class MIGHealthDomainEncountersComponent implements OnChanges, DoCheck
{
    public encounterDisplayedColumns = [ 'id', 'patient', 'effectiveTime', 'duration', 'authorisingUserInRole', 'enteredByUserInRole', 'organisations', 'location', 'components' ];
    public encounterDataSource: MatTableDataSource<MIGEncounter>;

    @Input()
    public encounters: MIGEncounter[];
    @Input()
    public format: string;

    @ViewChild('encounterPaginator')
    public encounterPaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.encounterDataSource      = new MatTableDataSource();
        this.encounterDataSource.data = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
          this.encounterDisplayedColumns = [ 'id', 'patient', 'effectiveTime', 'duration', 'authorisingUserInRole', 'enteredByUserInRole', 'organisations', 'location'];
        else
          this.encounterDisplayedColumns = [ /*'mappedPatient',*/ 'displayName', 'mappedLocation','mappedAuthorisingUserInRole', 'mappedEnteredByUserInRole', 'mappedOrganisation' ];

        if (this.encounters)
            this.encounterDataSource.data = this.encounters;
        else
            this.encounterDataSource.data = null;

        if (this.encounterDataSource.paginator)
            this.encounterDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.encounterDataSource.paginator != this.encounterPaginator)
        {
            this.encounterDataSource.paginator = this.encounterPaginator;
            this.encounterDataSource.paginator.firstPage();
        }
    }

    public patientMapping(patientId: string): string
    {
      return this.migInformationIndexService.basicPatientMapping(patientId);
    }

    public organisationMapping(organisationId: string): string
    {
      let org = this.migInformationIndexService.basicOrganisationMapping(organisationId);
      if (org == "EMISWebCR1 50005") {
        org = "EMIS Test Org";
      }
      return org;
    }

    public locationMapping(locationId: string): string
    {
      return this.migInformationIndexService.basicLocationMapping(locationId);
    }

    public userInRoleMapping(userInRoleId: string): string
    {
      return this.migInformationIndexService.basicUserInRoleMapping(userInRoleId);
    }

    public safeDisplayName(components: any): string
    {
      if (components && components[0] && components[0].heading)
        return components[0].heading.displayName;
      else
        return "";
    }
}

import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGOrganisation } from '../mig-organisation';

@Component
({
    selector:    'cnstll-mig-admindomain-organisations',
    templateUrl: './mig-admindomain-organisations.component.html',
    styleUrls:   ['./mig-admindomain-organisations.component.scss']
})
export class MIGAdminDomainOrganisationsComponent implements OnChanges, DoCheck
{
    public organisationDisplayedColumns: string[];
    public organisationDataSource: MatTableDataSource<MIGOrganisation>;

    @Input()
    public organisations: MIGOrganisation[];
    @Input()
    public format: string;

    @ViewChild('organisationPaginator')
    public organisationPaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.organisationDisplayedColumns = ['id', 'name', 'organisationType', 'nationalPracticeCode', 'mainLocation'];
        this.organisationDataSource       = new MatTableDataSource();
        this.organisationDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
            this.organisationDisplayedColumns = ['id', 'name', 'organisationType', 'nationalPracticeCode', 'mainLocation'];
        else
            this.organisationDisplayedColumns = ['name', 'organisationType', 'nationalPracticeCode', 'mappedMainLocation'];

        if (this.organisations)
            this.organisationDataSource.data = this.organisations;
        else
            this.organisationDataSource.data = null;

        if (this.organisationDataSource.paginator)
            this.organisationDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.organisationDataSource.paginator != this.organisationPaginator)
        {
            this.organisationDataSource.paginator = this.organisationPaginator;
            this.organisationDataSource.paginator.firstPage();
        }
    }

    public locationMapping(locationId: string): string
    {
        return this.migInformationIndexService.basicLocationMapping(locationId);
    }
}

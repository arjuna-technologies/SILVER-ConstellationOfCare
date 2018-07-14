import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGRole } from '../mig-role';

@Component
({
    selector:    'cnstll-mig-admindomain-roles',
    templateUrl: './mig-admindomain-roles.component.html',
    styleUrls:   ['./mig-admindomain-roles.component.scss']
})
export class MIGAdminDomainRolesComponent implements OnChanges, DoCheck
{
    public roleDisplayedColumns: string[];
    public roleDataSource: MatTableDataSource<MIGRole>;

    @Input()
    public roles: MIGRole[];
    @Input()
    public format: string;

    @ViewChild('rolePaginator')
    public rolePaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.roleDisplayedColumns = ['id', 'name', 'userCategory', 'organisation', 'confidentialityPolicy'];
        this.roleDataSource       = new MatTableDataSource();
        this.roleDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
            this.roleDisplayedColumns = ['id', 'name', 'userCategory', 'organisation', 'confidentialityPolicy'];
        else
            this.roleDisplayedColumns = ['name', 'userCategory', 'mappedOrganisation', 'confidentialityPolicy'];

        if (this.roles)
            this.roleDataSource.data = this.roles;
        else
            this.roleDataSource.data = null;

        if (this.roleDataSource.paginator)
            this.roleDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.roleDataSource.paginator != this.rolePaginator)
        {
            this.roleDataSource.paginator = this.rolePaginator;
            this.roleDataSource.paginator.firstPage();
        }
    }

    public organisationMapping(organisationId: string): string
    {
        return this.migInformationIndexService.basicOrganisationMapping(organisationId);
    }
}

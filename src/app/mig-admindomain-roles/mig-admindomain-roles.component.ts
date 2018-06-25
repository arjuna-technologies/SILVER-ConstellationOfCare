import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGRole } from '../mig-role';

@Component
({
    selector:    'cnstll-mig-admindomain-roles',
    templateUrl: './mig-admindomain-roles.component.html',
    styleUrls:   ['./mig-admindomain-roles.component.scss']
})
export class MIGAdminDomainRolesComponent implements OnChanges, DoCheck
{
    public roleDisplayedColumns = ['id', 'name', 'userCategory', 'organisation', 'confidentialityPolicy'];
    public roleDataSource: MatTableDataSource<MIGRole>;

    @Input()
    public roles: MIGRole[];

    @ViewChild('rolePaginator')
    public rolePaginator: MatPaginator;

    public constructor()
    {
        this.roleDataSource      = new MatTableDataSource();
        this.roleDataSource.data = null;
    }

    public ngOnChanges(): void
    {
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
}

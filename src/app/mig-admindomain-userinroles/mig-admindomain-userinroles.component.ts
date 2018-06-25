import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGUserInRole } from '../mig-userinrole';

@Component
({
    selector:    'cnstll-mig-admindomain-userinroles',
    templateUrl: './mig-admindomain-userinroles.component.html',
    styleUrls:   ['./mig-admindomain-userinroles.component.scss']
})
export class MIGAdminDomainUserInRolesComponent implements OnChanges, DoCheck
{
    public userInRoleDisplayedColumns = ['id', 'user', 'role', 'contractualRelationship', 'contractStart', 'contractEnd', 'filingConfidentialityPolicy', 'userIdentifiers'];
    public userInRoleDataSource: MatTableDataSource<MIGUserInRole>;

    @Input()
    public userInRoles: MIGUserInRole[];

    @ViewChild('userInRolePaginator')
    public userInRolePaginator: MatPaginator;

    public constructor()
    {
        this.userInRoleDataSource      = new MatTableDataSource();
        this.userInRoleDataSource.data = null;
    }

    public ngOnChanges(): void
    {
        if (this.userInRoles)
            this.userInRoleDataSource.data = this.userInRoles;
        else
            this.userInRoleDataSource.data = null;

        if (this.userInRoleDataSource.paginator)
            this.userInRoleDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.userInRoleDataSource.paginator != this.userInRolePaginator)
        {
            this.userInRoleDataSource.paginator = this.userInRolePaginator;
            this.userInRoleDataSource.paginator.firstPage();
        }
    }
}

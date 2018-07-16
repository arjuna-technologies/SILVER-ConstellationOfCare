import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGUserInRole } from '../mig-userinrole';

@Component
({
    selector:    'cnstll-mig-admindomain-userinroles',
    templateUrl: './mig-admindomain-userinroles.component.html',
    styleUrls:   ['./mig-admindomain-userinroles.component.scss']
})
export class MIGAdminDomainUserInRolesComponent implements OnChanges, DoCheck
{
    public userInRoleDisplayedColumns: string[];
    public userInRoleDataSource: MatTableDataSource<MIGUserInRole>;

    @Input()
    public userInRoles: MIGUserInRole[];
    @Input()
    public format: string;

    @ViewChild('userInRolePaginator')
    public userInRolePaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.userInRoleDisplayedColumns = ['id', 'user', 'role', 'contractualRelationship', 'contractStart', 'contractEnd', 'filingConfidentialityPolicy', 'userIdentifiers'];
        this.userInRoleDataSource       = new MatTableDataSource();
        this.userInRoleDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
            this.userInRoleDisplayedColumns = ['id', 'user', 'role', 'contractualRelationship', 'contractStart', 'contractEnd', 'filingConfidentialityPolicy', 'userIdentifiers'];
        else
            this.userInRoleDisplayedColumns = ['mappedUser', 'mappedRole', 'contractualRelationship', 'contractStart', 'contractEnd', 'filingConfidentialityPolicy', 'userIdentifiers'];

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

    public userMapping(userId: string): string
    {
        return this.migInformationIndexService.basicUserMapping(userId);
    }

    public roleMapping(roleId: string): string
    {
        return this.migInformationIndexService.basicRoleMapping(roleId);
    }
}

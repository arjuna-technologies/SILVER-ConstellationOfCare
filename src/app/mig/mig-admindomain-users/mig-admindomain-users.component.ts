import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGUser } from '../mig-user';

@Component
({
    selector:    'cnstll-mig-admindomain-users',
    templateUrl: './mig-admindomain-users.component.html',
    styleUrls:   ['./mig-admindomain-users.component.scss']
})
export class MIGAdminDomainUsersComponent implements OnChanges, DoCheck
{
    public userDisplayedColumns: string[];
    public userDataSource: MatTableDataSource<MIGUser>;

    @Input()
    public users: MIGUser[];
    @Input()
    public format: string;

    @ViewChild('userPaginator')
    public userPaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.userDisplayedColumns = ['id', 'userPerson', 'mnemonic'];
        this.userDataSource       = new MatTableDataSource();
        this.userDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
            this.userDisplayedColumns = ['id', 'userPerson', 'mnemonic'];
        else
            this.userDisplayedColumns = ['mappedUserPerson', 'mnemonic'];

        if (this.users)
            this.userDataSource.data = this.users;
        else
            this.userDataSource.data = null;

        if (this.userDataSource.paginator)
            this.userDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.userDataSource.paginator != this.userPaginator)
        {
            this.userDataSource.paginator = this.userPaginator;
            this.userDataSource.paginator.firstPage();
        }
    }

    public userMapping(userId: string): string
    {
        return this.migInformationIndexService.basicUserMapping(userId);
    }
}

import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGUser } from '../mig-user';

@Component
({
    selector:    'cnstll-mig-admindomain-users',
    templateUrl: './mig-admindomain-users.component.html',
    styleUrls:   ['./mig-admindomain-users.component.scss']
})
export class MIGAdminDomainUsersComponent implements OnChanges, DoCheck
{
    public userDisplayedColumns = ['id', 'userPerson', 'mnemonic'];
    public userDataSource: MatTableDataSource<MIGUser>;

    @Input()
    public users: MIGUser[];

    @ViewChild('userPaginator')
    public userPaginator: MatPaginator;

    public constructor()
    {
        this.userDataSource      = new MatTableDataSource();
        this.userDataSource.data = null;
    }

    public ngOnChanges(): void
    {
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
}

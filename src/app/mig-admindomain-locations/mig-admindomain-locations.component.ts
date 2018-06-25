import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGLocation } from '../mig-location';

@Component
({
    selector:    'cnstll-mig-admindomain-locations',
    templateUrl: './mig-admindomain-locations.component.html',
    styleUrls:   ['./mig-admindomain-locations.component.scss']
})
export class MIGAdminDomainLocationsComponent implements OnChanges, DoCheck
{
    public locationDisplayedColumns = ['id', 'name', 'address'];
    public locationDataSource: MatTableDataSource<MIGLocation>;

    @Input()
    public locations: MIGLocation[];

    @ViewChild('locationPaginator')
    public locationPaginator: MatPaginator;

    public constructor()
    {
        this.locationDataSource      = new MatTableDataSource();
        this.locationDataSource.data = null;
    }

    public ngOnChanges(): void
    {
        if (this.locations)
            this.locationDataSource.data = this.locations;
        else
            this.locationDataSource.data = null;

        if (this.locationDataSource.paginator)
            this.locationDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.locationDataSource.paginator != this.locationPaginator)
        {
            this.locationDataSource.paginator = this.locationPaginator;
            this.locationDataSource.paginator.firstPage();
        }
    }
}

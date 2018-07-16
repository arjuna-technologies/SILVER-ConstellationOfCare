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
    public locationDisplayedColumns: string[];
    public locationDataSource: MatTableDataSource<MIGLocation>;

    @Input()
    public locations: MIGLocation[];
    @Input()
    public format: string;

    @ViewChild('locationPaginator')
    public locationPaginator: MatPaginator;

    public constructor()
    {
        this.locationDisplayedColumns = ['id', 'name', 'address'];
        this.locationDataSource       = new MatTableDataSource();
        this.locationDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
            this.locationDisplayedColumns = ['id', 'name', 'address'];
        else
            this.locationDisplayedColumns = ['name', 'mappedAddress'];

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

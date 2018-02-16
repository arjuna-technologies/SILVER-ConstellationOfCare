import { Component } from '@angular/core';

import { DataSource } from '../data-source';

@Component
({
    selector:    'cnstll-data-source',
    templateUrl: './data-source.component.html',
    styleUrls:   ['./data-source.component.scss']
})
export class DataSourceComponent
{
    public dataSource: DataSource;

    public loading:    boolean;

    public constructor()
    {
        this.dataSource = null;
        this.loading    = false;
    }

    public doShowDataSource(dataSource: DataSource): void
    {
        this.dataSource = dataSource;
    }
}

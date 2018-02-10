import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DataSource } from '../data-source';

@Component
({
    selector:    'cnstll-data-source',
    templateUrl: './data-source.component.html',
    styleUrls:   ['./data-source.component.scss']
})
export class DataSourceComponent implements OnChanges
{
    @Input()
    public dataSource: DataSource;
    @Input()
    public loading:    boolean;

    public constructor()
    {
        this.dataSource = new DataSource('0', 'DS Name', []);
        this.loading    = false;
    }

    public ngOnChanges(changes: SimpleChanges)
    {
    }
}

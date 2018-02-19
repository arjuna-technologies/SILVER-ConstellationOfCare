import { Component } from '@angular/core';

import { Family }   from '../family';
import { DataType } from '../data-type';

import { DataService } from '../data.service';

@Component
({
    selector:    'cnstll-data-types',
    templateUrl: './data-types.component.html',
    styleUrls:   ['./data-types.component.scss']
})
export class DataTypesComponent
{
    public dataTypes: DataType[];
    public loading:   boolean;

    public constructor(private dataService: DataService)
    {
        this.dataTypes = null;
        this.loading   = false;
    }

    public doShowFamilyInformation(family: Family): void
    {
        if (family)
            this.loadFamilyInformation();
        else
            this.dataTypes = null;
    }

    private loadFamilyInformation(): void
    {
        this.dataTypes = [];
        this.loading   = true;

        this.dataService.loadFamilyInformation()
            .then(dataTypes => this.loadFamilyInformationSuccess(dataTypes))
            .catch(error => this.loadFamilyInformationFailed(error));
    }

    private loadFamilyInformationSuccess(dataTypes: DataType[]): void
    {
        this.dataTypes = dataTypes;
        this.loading   = false;
    }

    private loadFamilyInformationFailed(error: any): void
    {
        this.dataTypes = null;
        this.loading   = false;
    }
}

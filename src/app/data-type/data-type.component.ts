import { Component, Input } from '@angular/core';

import { DataType } from '../data-type';

@Component
({
    selector:    'cnstll-data-type',
    templateUrl: './data-type.component.html',
    styleUrls:   ['./data-type.component.scss']
})
export class DataTypeComponent
{
    @Input()
    public dataType: DataType;

    public constructor()
    {
    }
}

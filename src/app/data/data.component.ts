import { Component, Input } from '@angular/core';

import { Data } from '../data';

@Component
({
    selector:    'cnstll-data',
    templateUrl: './data.component.html',
    styleUrls:   ['./data.component.scss']
})
export class DataComponent
{
    @Input()
    public data: Data;

    public constructor()
    {
    }
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Person } from '../person';

@Component
({
    selector:    'cnstll-person',
    templateUrl: './person.component.html',
    styleUrls:   ['./person.component.scss']
})
export class PersonComponent implements OnChanges
{
    @Input()
    public person:  Person;
    @Input()
    public loading: boolean;

    public constructor()
    {
        this.loading = false;
    }

    public ngOnChanges(changes: SimpleChanges)
    {
    }
}

import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

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
    @Output()
    public selectNHSNumber: EventEmitter<string>;

    public constructor()
    {
        this.loading = false;

        this.selectNHSNumber = new EventEmitter<string>();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
    }

    public doSelectNHSNumber(): void
    {
        this.selectNHSNumber.emit('4853379371');
    }
}

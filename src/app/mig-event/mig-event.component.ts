import { Component, OnInit, Input } from '@angular/core';

import { MIGEvent } from '../mig-event';

@Component
({
    selector:    'cnstll-mig-event',
    templateUrl: './mig-event.component.html',
    styleUrls:   ['./mig-event.component.scss']
})
export class MIGEventComponent implements OnInit
{
    @Input("event")
    public event: MIGEvent;

    public constructor()
    {
    }

    public ngOnInit()
    {
    }
}

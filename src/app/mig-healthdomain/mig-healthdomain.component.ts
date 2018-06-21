import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';

import { MIGInformation } from '../mig-information';

@Component
({
    selector:    'cnstll-mig-healthdomain',
    templateUrl: './mig-healthdomain.component.html',
    styleUrls:   ['./mig-healthdomain.component.scss']
})
export class MIGHealthDomainComponent implements OnChanges, DoCheck
{
    @Input()
    public information: MIGInformation;

    public constructor()
    {
    }

    public ngOnChanges(): void
    {
    }

    public ngDoCheck(): void
    {
    }
}

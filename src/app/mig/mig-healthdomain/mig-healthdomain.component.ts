import { Component, Input, ViewChild } from '@angular/core';

import { MIGInformation } from '../mig-information';

@Component
({
    selector:    'cnstll-mig-healthdomain',
    templateUrl: './mig-healthdomain.component.html',
    styleUrls:   ['./mig-healthdomain.component.scss']
})
export class MIGHealthDomainComponent
{
    @Input()
    public information: MIGInformation;
    @Input()
    public format: string;

    public constructor()
    {
    }
}

import { Component, DoCheck, Input, ViewChild } from '@angular/core';

import { MIGInformation } from '../mig-information';

@Component
({
    selector:    'cnstll-mig-admindomain',
    templateUrl: './mig-admindomain.component.html',
    styleUrls:   ['./mig-admindomain.component.scss']
})
export class MIGAdminDomainComponent implements DoCheck
{
    @Input()
    public information: MIGInformation;

    public constructor()
    {
    }

    public ngDoCheck(): void
    {
    }
}

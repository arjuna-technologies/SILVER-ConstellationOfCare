import { Component, Input, ViewChild } from '@angular/core';

import { MIGInformation } from '../mig-information';

@Component
({
    selector:    'cnstll-mig-admindomain',
    templateUrl: './mig-admindomain.component.html',
    styleUrls:   ['./mig-admindomain.component.scss']
})
export class MIGAdminDomainComponent
{
    @Input()
    public information: MIGInformation;

    public constructor()
    {
    }
}

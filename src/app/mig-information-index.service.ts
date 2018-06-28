import { Injectable } from '@angular/core';

import { MIGInformation } from './mig-information';

@Injectable
({
    providedIn: 'root'
})
export class MIGInformationIndexService
{
    public information: MIGInformation;

    constructor()
    {
    }
}

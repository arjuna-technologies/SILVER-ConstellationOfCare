import { Component } from '@angular/core';

import { AccessProcess } from '../access-process';

@Component
({
    selector:    'cnstll-access-process',
    templateUrl: './access-process.component.html',
    styleUrls:   ['./access-process.component.scss']
})
export class AccessProcessComponent
{
    public accessProcess: AccessProcess;

    public loading: boolean;

    public constructor()
    {
        this.accessProcess = null;
        this.loading       = false;
    }

    public doShowAccessProcess(accessProcess: AccessProcess): void
    {
        this.accessProcess = accessProcess;
    }
}

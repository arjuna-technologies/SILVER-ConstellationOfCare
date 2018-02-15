import { Component, Input } from '@angular/core';

import { AccessProcess } from ',,/access-process';

@Component
({
    selector:    'cnstll-access-process',
    templateUrl: './access-process.component.html',
    styleUrls:   ['./access-process.component.scss']
})
export class AccessProcessComponent
{
    @Input()
    public dataSource: AccessProcess;

    public loading: boolean;

    public constructor()
    {
    }
}

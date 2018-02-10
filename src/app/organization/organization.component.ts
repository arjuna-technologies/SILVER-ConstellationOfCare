import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Organization } from '../organization';

@Component
({
    selector:    'cnstll-organization',
    templateUrl: './organization.component.html',
    styleUrls:   ['./organization.component.scss']
})
export class OrganizationComponent implements OnChanges
{
    @Input()
    public organization: Organization;
    @Input()
    public loading:      boolean;

    public constructor()
    {
        this.organization  = new Organization('0', 'Org Name', []);
        this.loading       = false;
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
    }
}

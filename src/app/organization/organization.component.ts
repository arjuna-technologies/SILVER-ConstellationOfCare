import { Component } from '@angular/core';

import { Organization } from '../organization';

@Component
({
    selector:    'cnstll-organization',
    templateUrl: './organization.component.html',
    styleUrls:   ['./organization.component.scss']
})
export class OrganizationComponent
{
    public organization: Organization;
    public loading:      boolean;

    public constructor()
    {
        this.organization  = null;
        this.loading       = false;
    }

    public doShowOrganization(organization: Organization): void
    {
        this.organization = organization;
    }
}

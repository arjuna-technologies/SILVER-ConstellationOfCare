import { Component } from '@angular/core';

import { Organization } from '../organization';

import { DataService } from '../data.service';

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

    public constructor(private dataService: DataService)
    {
        this.organization  = null;
        this.loading       = false;
    }

    public doLoadOrganization(organizationId: string): void
    {
        this.loadOrganization(organizationId);
    }

    private loadOrganization(familyId: string): void
    {
        this.loading = true;

        this.dataService.loadOrganization(familyId)
            .then(family => this.loadOrganizationSuccess(family))
            .catch(error => this.loadOrganizationFailed(error));
    }

    private loadOrganizationSuccess(organization: Organization): void
    {
        this.organization = organization;
        this.loading      = false;
    }

    private loadOrganizationFailed(error: any): void
    {
        this.organization = null;
        this.loading      = false;
    }
}

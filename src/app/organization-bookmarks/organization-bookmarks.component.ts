import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Organization } from '../organization';

import { DataService } from '../data.service';

@Component
({
    selector:    'cnstll-organization-bookmarks',
    templateUrl: './organization-bookmarks.component.html',
    styleUrls:   ['./organization-bookmarks.component.scss']
})
export class OrganizationBookmarksComponent implements OnInit
{
    public organizations: Organization[];
    public loading:       boolean;

    @Output()
    public organizationSelect: EventEmitter<string>;

    public constructor(private dataService: DataService)
    {
        this.organizations = null;
        this.loading       = true;

        this.organizationSelect = new EventEmitter<string>();
    }

    public ngOnInit(): void
    {
        this.loadOrganizations();
    }

    public doOrganizationSelect(organizationId: string): void
    {
        this.organizationSelect.emit(organizationId);
    }

    private loadOrganizations(): void
    {
        this.loading = true;

        this.dataService.loadOrganizations()
            .then(organizations => this.loadOrganizationsSuccess(organizations))
            .catch(error => this.loadOrganizationsFailed(error));
    }

    private loadOrganizationsSuccess(organizations: Organization[]): void
    {
        console.log('length: ' + organizations.length);
        this.organizations  = organizations;
        this.loading        = false;
        console.log('length: ' + this.organizations.length);
    }

    private loadOrganizationsFailed(error: any): void
    {
        this.organizations = null;
        this.loading       = false;
    }
 }

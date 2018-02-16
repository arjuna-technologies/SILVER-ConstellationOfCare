import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Organization }  from '../organization';
import { DataSource }    from '../data-source';
import { AccessProcess } from '../access-process';

import { DataService }  from '../data.service';

@Component
({
    selector:    'cnstll-information-bookmarks',
    templateUrl: './information-bookmarks.component.html',
    styleUrls:   ['./information-bookmarks.component.scss']
})
export class InformationBookmarksComponent implements OnInit
{
    public organizations: Organization[];
    public organization:  Organization;
    public dataSource:    DataSource;
    public accessProcess: AccessProcess;
    public loading:       boolean;

    @Output()
    public organizationSelect: EventEmitter<Organization>;
    @Output()
    public dataSourceSelect: EventEmitter<DataSource>;
    @Output()
    public accessProcessSelect: EventEmitter<AccessProcess>;

    public constructor(private dataService: DataService)
    {
        this.organizations = null;
        this.organization  = null;
        this.dataSource    = null;
        this.accessProcess = null;
        this.loading       = false;

        this.organizationSelect  = new EventEmitter<Organization>();
        this.dataSourceSelect    = new EventEmitter<DataSource>();
        this.accessProcessSelect = new EventEmitter<AccessProcess>();
    }

    public ngOnInit(): void
    {
        this.organizations = null;
        this.organization  = null;
        this.dataSource    = null;
        this.accessProcess = null;
        this.loading       = false;

        this.loadOrganizations();
    }

    public doOrganizationSelect(organizationId: string): void
    {
        this.dataSource    = null;
        this.accessProcess = null;
        this.dataSourceSelect.emit(null);
        this.accessProcessSelect.emit(null);

        this.loadOrganization(organizationId);
    }

    public doDataSourceSelect(dataSourceId: string): void
    {
        this.accessProcess = null;
        this.accessProcessSelect.emit(null);

        this.loadDataSource(dataSourceId);
    }

    public doAccessProcessSelect(accessProcessId: string): void
    {
        this.loadAccessProcess(accessProcessId);
    }

    public doClose(organizationId: string): void
    {
        this.organization  = null;
        this.dataSource    = null;
        this.accessProcess = null;

        this.organizationSelect.emit(null);
        this.dataSourceSelect.emit(null);
        this.accessProcessSelect.emit(null);
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
        this.organizations = organizations;
        this.loading       = false;
    }

    private loadOrganizationsFailed(error: any): void
    {
        this.organizations = null;
        this.loading       = false;
    }

    private loadOrganization(organizationId: string): void
    {
        this.loading = true;

        this.dataService.loadOrganization(organizationId)
            .then(organization => this.loadOrganizationSuccess(organization))
            .catch(error => this.loadOrganizationFailed(error));
    }

    private loadOrganizationSuccess(organization: Organization): void
    {
        this.organization = organization;
        this.loading      = false;

        this.organizationSelect.emit(organization);
    }

    private loadOrganizationFailed(error: any): void
    {
        this.organization = null;
        this.loading      = false;

        this.organizationSelect.emit(null);
   }

    private loadDataSource(dataSourceId: string): void
    {
        this.loading = true;

        this.dataService.loadDataSource(dataSourceId)
            .then(dataSource => this.loadDataSourceSuccess(dataSource))
            .catch(error => this.loadDataSourceFailed(error));
    }

    private loadDataSourceSuccess(dataSource: DataSource): void
    {
        this.dataSource = dataSource;
        this.loading    = false;

        this.dataSourceSelect.emit(dataSource);
    }

    private loadDataSourceFailed(error: any): void
    {
        this.dataSource = null;
        this.loading    = false;

        this.dataSourceSelect.emit(null);
    }

    private loadAccessProcess(accessProcessId: string): void
    {
        this.loading = true;

        this.dataService.loadAccessProcess(accessProcessId)
            .then(accessProcess => this.loadAccessProcessSuccess(accessProcess))
            .catch(error => this.loadAccessProcessFailed(error));
    }

    private loadAccessProcessSuccess(accessProcess: AccessProcess): void
    {
        this.accessProcess = accessProcess;
        this.loading       = false;

        this.accessProcessSelect.emit(accessProcess);
    }

    private loadAccessProcessFailed(error: any): void
    {
        this.accessProcess = null;
        this.loading       = false;

        this.accessProcessSelect.emit(null);
    }
}

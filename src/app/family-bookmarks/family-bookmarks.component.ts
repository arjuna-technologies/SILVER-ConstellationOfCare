import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Family } from '../family';

import { DataService } from '../data.service';

@Component
({
    selector:    'cnstll-family-bookmarks',
    templateUrl: './family-bookmarks.component.html',
    styleUrls:   ['./family-bookmarks.component.scss']
})
export class FamilyBookmarksComponent implements OnInit
{
    @Output()
    public familySelect: EventEmitter<string>;

    public families: Family[];
    public loading:  boolean;

    public constructor(private dataService: DataService)
    {
        this.familySelect = new EventEmitter<string>();

        this.families = null;
        this.loading  = true;
    }

    public ngOnInit(): void
    {
        this.loadFamilies();
    }

    public doFamilySelect(familyId: string): void
    {
        this.familySelect.emit(familyId);
    }

    public doReloadFamilies(): void
    {
        this.loadFamilies();
    }

    private loadFamilies(): void
    {
        this.loading = true;

        this.dataService.loadFamilies()
            .then(families => this.loadFamiliesSuccess(families))
            .catch(error => this.loadFamiliesFailed(error));
    }

    private loadFamiliesSuccess(families: Family[]): void
    {
        this.families  = families;
        this.loading   = false;
    }

    private loadFamiliesFailed(error: any): void
    {
        this.families = null;
        this.loading  = false;
    }
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Family } from '../family';

@Component
({
    selector:    'cnstll-family-bookmarks',
    templateUrl: './family-bookmarks.component.html',
    styleUrls:   ['./family-bookmarks.component.scss']
})
export class FamilyBookmarksComponent implements OnChanges
{
    @Input()
    public families: Family[];
    @Input()
    public loading: boolean;

    public constructor()
    {
        this.families = null;
        this.loading  = true;
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
    }
}

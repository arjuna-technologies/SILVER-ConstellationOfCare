import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Person } from '../person';
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
    public familyNames: string[];

    public families: Family[];
    public loading:  boolean;

    @Output()
    public familySelect: EventEmitter<string>;

    public constructor(private dataService: DataService)
    {
        this.familyNames = [];

        this.families = null;
        this.loading  = true;

        this.familySelect = new EventEmitter<string>();
    }

    public ngOnInit(): void
    {
        this.loadFamilies();
    }

    public doFamilySelect(familyId: string): void
    {
        this.familySelect.emit(familyId);
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
        this.familyNames = [];

        this.families  = families;
        this.loading   = false;

        for (let family of families)
            this.familyNames.push(this.generateFamilyName(family.persons));
    }

    private loadFamiliesFailed(error: any): void
    {
        this.familyNames = [];

        this.families = null;
        this.loading  = false;
    }

    private generateFamilyName(persons: Person[]): string
    {
        let surnames: string[] = [];

        for (let person of persons)
            surnames.push(person.surname);

        surnames.sort();

        let surnameIndex = 0;
        while (surnameIndex < surnames.length - 1)
            if (surnames[surnameIndex] === surnames[surnameIndex + 1])
                surnames.splice(surnameIndex, 1);
            else
                surnameIndex++;

        let concatSurnames = '';
        for (let surnameIndex = 0; surnameIndex < surnames.length; surnameIndex++)
            if (surnameIndex === 0)
                concatSurnames = surnames[surnameIndex];
            else
                concatSurnames = concatSurnames.concat('/', surnames[surnameIndex]);

        return concatSurnames;
    }
}

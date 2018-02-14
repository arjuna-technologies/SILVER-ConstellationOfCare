import { Component } from '@angular/core';

import { Family } from '../family';
import { Person } from '../person';

import { DataService } from '../data.service';

@Component
({
    selector:    'cnstll-family',
    templateUrl: './family.component.html',
    styleUrls:   ['./family.component.scss']
})
export class FamilyComponent
{
    public familyName: string;

    public family:  Family;
    public loading: boolean;

    public constructor(private dataService: DataService)
    {
        this.familyName = '';

        this.family  = null;
        this.loading = false;
    }

    public doLoadFamily(familyId: string): void
    {
        this.loadFamily(familyId);
    }

    private loadFamily(familyId: string): void
    {
        this.loading = true;

        this.dataService.loadFamily(familyId)
            .then(family => this.loadFamilySuccess(family))
            .catch(error => this.loadFamilyFailed(error));
    }

    private loadFamilySuccess(family: Family): void
    {
        this.family  = family;
        this.loading = false;

        this.familyName = this.generateFamilyName(this.family.persons);
    }

    private loadFamilyFailed(error: any): void
    {
        this.family  = null;
        this.loading = false;

        this.familyName = this.generateFamilyName(this.family.persons);
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

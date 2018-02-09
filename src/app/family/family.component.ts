import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Family } from '../family';
import { Person } from '../person';

@Component
({
    selector:    'cnstll-family',
    templateUrl: './family.component.html',
    styleUrls:   ['./family.component.scss']
})
export class FamilyComponent implements OnChanges
{
    @Input()
    public family:  Family;
    @Input()
    public loading: boolean;

    public familyName: string;

    public constructor()
    {
        this.family  = new Family([]);
        this.loading = false;

        this.familyName = '';
    }

    public ngOnChanges(changes: SimpleChanges)
    {
        if (this.family === null)
            this.familyName = '';
        else
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

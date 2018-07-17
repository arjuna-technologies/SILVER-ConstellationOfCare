import { Component , Output, EventEmitter } from '@angular/core';

import { Family       } from '../family';
import { FamilyMember } from '../family-member';

@Component
({
    selector:    'cnstll-family',
    templateUrl: './family.component.html',
    styleUrls:   ['./family.component.scss']
})
export class FamilyComponent
{
    public family:         Family;
    public familyName:     string;
    public panelOpenState: boolean;
    public loading:        boolean;

    @Output()
    public selectNHSNumber: EventEmitter<string>;

    public constructor()
    {
        this.family         = null;
        this.familyName     = '';
        this.panelOpenState = true;
        this.loading        = false;

        this.selectNHSNumber = new EventEmitter<string>();
    }

    public doShowLoading(): void
    {
        this.loading = true;
    }

    public doShowFamily(family: Family): void
    {
        this.family = family;
        if (family)
            this.familyName = this.generateFamilyName(family.familyMembers);
        else
            this.familyName = '';
        this.panelOpenState = false;
        this.loading = false;
    }

    public doSelectNHSNumber(nhsNumber: string): void
    {
        console.log('NHS Number: ' + nhsNumber);
        this.panelOpenState = false;
        this.selectNHSNumber.emit(nhsNumber);
    }

    private generateFamilyName(familyMembers: FamilyMember[]): string
    {
        if (familyMembers)
        {
            let surnames: string[] = [];

            for (let familyMember of familyMembers)
                surnames.push(familyMember.surname);

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
        else
            return '';
    }
}

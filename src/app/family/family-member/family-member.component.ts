import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { FamilyMember } from '../family-member';

@Component
({
    selector:    'cnstll-family-member',
    templateUrl: './family-member.component.html',
    styleUrls:   ['./family-member.component.scss']
})
export class FamilyMemberComponent implements OnChanges
{
    @Input()
    public familyMember: FamilyMember;
    @Input()
    public loading: boolean;
    @Output()
    public selectNHSNumber: EventEmitter<string>;

    public constructor()
    {
        this.loading = false;

        this.selectNHSNumber = new EventEmitter<string>();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
    }

    public doSelectNHSNumber(): void
    {
        if (this.familyMember.nhsNumber !== '')
            this.selectNHSNumber.emit(this.familyMember.nhsNumber);
    }
}

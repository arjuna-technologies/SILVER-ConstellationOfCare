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
    public selectMIG: EventEmitter<string>;
    @Output()
    public selectESPFHIR: EventEmitter<string>;

    public constructor()
    {
        this.selectMIG     = new EventEmitter<string>();
        this.selectESPFHIR = new EventEmitter<string>();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
    }

    public doSelectMIG(): void
    {
        if (this.familyMember.nhsNumber !== '')
            this.selectMIG.emit(this.familyMember.nhsNumber);
    }

    public doSelectESPFHIR(): void
    {
        if (this.familyMember.nhsNumber !== '')
            this.selectESPFHIR.emit(this.familyMember.nhsNumber);
    }
}

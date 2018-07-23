import { Component, OnInit, Input } from '@angular/core';

import { MIGInformation } from '../../mig/mig-information';

@Component
({
    selector:    'cnstll-patient-overview',
    templateUrl: './patient-overview.component.html',
    styleUrls:   ['./patient-overview.component.scss']
})
export class PatientOverviewComponent implements OnInit
{
    @Input()
    public information: MIGInformation;

    public constructor()
    {
    }

    public ngOnInit(): void
    {
    }
}

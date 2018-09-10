import { MIGPatientMatch } from './mig-patientmatch';

export class MIGPatientTrace
{
    public status:        string;
    public patientMatchs: MIGPatientMatch[];

    public constructor(status: string, patientMatchs: MIGPatientMatch[])
    {
        this.status        = status;
        this.patientMatchs = patientMatchs;
    }
}

export class MIGPatientMatch
{
    public primaryIdentifier: string;
    public person:            string;
    public birthDate:         string;
    public deceasedDate:      string;
    public address:           string[];
    public telecom:           string[];
    public careProfessional:  string;
    public organisation:      string;
    public addresses:         string[];

    public constructor(primaryIdentifier: string)
    {
        this.primaryIdentifier = primaryIdentifier;
    }
}

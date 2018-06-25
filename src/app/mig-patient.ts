export class MIGPatient
{
    public id:                     string;
    public patientIdentifiers:     any;
    public patientPerson:          string;
    public spokenLanguage:         string;
    public spokenLanguageIsoCode:  string;
    public registeredGPUserInRole: string;
    public usualGPUserInRole:      string;
    public caseloadPatients:       any;

    public constructor(id: string, patientIdentifiers: any, patientPerson: string, spokenLanguage: string, spokenLanguageIsoCode: string, registeredGPUserInRole: string, usualGPUserInRole: string, caseloadPatients: any)
    {
        this.id                     = id;
        this.patientIdentifiers     = patientIdentifiers;
        this.patientPerson          = patientPerson;
        this.spokenLanguage         = spokenLanguage;
        this.spokenLanguageIsoCode  = spokenLanguageIsoCode;
        this.registeredGPUserInRole = registeredGPUserInRole;
        this.usualGPUserInRole      = usualGPUserInRole;
        this.caseloadPatients       = caseloadPatients;
    }
}

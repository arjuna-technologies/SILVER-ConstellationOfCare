export class MIGUserInRole
{
    public id:                          string;
    public user:                        string;
    public role:                        string;
    public contractualRelationship:     string;
    public contractStart:               string;
    public contractEnd:                 string;
    public filingConfidentialityPolicy: string;
    public userIdentifiers:             any;

    public constructor(id: string, user: string, role: string, contractualRelationship: string, contractStart: string, contractEnd: string, filingConfidentialityPolicy: string, userIdentifiers: any)
    {
        this.id                          = id;
        this.user                        = user;
        this.role                        = role;
        this.contractualRelationship     = contractualRelationship;
        this.contractStart               = contractStart;
        this.contractEnd                 = contractEnd;
        this.filingConfidentialityPolicy = filingConfidentialityPolicy;
        this.userIdentifiers             = userIdentifiers;
    }
}

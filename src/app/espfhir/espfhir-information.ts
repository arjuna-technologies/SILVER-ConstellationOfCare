export class ESPFHIRInformation
{
    public nhsNumber: string;
    public status:    string;

    public constructor(nhsNumber: string, status: string)
    {
        this.nhsNumber = nhsNumber;
        this.status    = status;
    }
}

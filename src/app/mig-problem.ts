export class MIGProblem
{
    public id:               string;
    public status:           string;
    public significance:     string;
    public expectedDuration: string;
    public endTime:          string;

    public constructor(id: string, status: string, significance: string, expectedDuration: string, endTime: string)
    {
        this.id               = id;
        this.status           = status;
        this.significance     = significance;
        this.expectedDuration = expectedDuration;
        this.endTime          = endTime;
    }
}

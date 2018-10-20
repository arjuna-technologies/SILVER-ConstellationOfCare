export class StorageInformation
{
    public outcome: string;
    public message: string;
    public content: any;

    public constructor(outcome: string, message: string, content: any)
    {
        this.outcome = outcome;
        this.message = message;

        this.content = content;
    }
}

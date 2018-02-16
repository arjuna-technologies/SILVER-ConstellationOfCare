import { AccessProcess } from './access-process';

export class DataSource
{
    public id:              string;
    public name:            string;
    public description:     string;
    public accessProcesses: AccessProcess[];

    public constructor(id: string, name: string, description: string, accessProcesses: AccessProcess[])
    {
        this.id              = id;
        this.name            = name;
        this.description     = description;
        this.accessProcesses = accessProcesses;
    }
}

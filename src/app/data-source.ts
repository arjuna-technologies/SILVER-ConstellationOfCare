import { AccessProcess } from './access-process';

export class DataSource
{
    public id:              string;
    public name:            string;
    public accessProcesses: AccessProcess[];

    public constructor(id: string, name: string, accessProcesses: AccessProcess[])
    {
        this.id              = id;
        this.name            = name;
        this.accessProcesses = accessProcesses;
    }
}

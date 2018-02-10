import { AccessProcess } from './access-process';

export class DataSource
{
    public id:            string;
    public name:          string;
    public accessProcess: AccessProcess[];

    public constructor(id: string, name: string, accessProcess: AccessProcess[])
    {
        this.id            = id;
        this.name          = name;
        this.accessProcess = accessProcess;
    }
}

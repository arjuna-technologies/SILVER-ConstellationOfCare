import { AccessProcess } from './access-process';

export class DataSource
{
    public name:          string;
    public accessProcess: AccessProcess[];

    public constructor(name: string, accessProcess: AccessProcess[])
    {
        this.name          = name;
        this.accessProcess = accessProcess;
    }
}

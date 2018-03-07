import { Injectable } from '@angular/core';

declare var google: any;

@Injectable()
export class GoogleChartsLoaderService
{
    private promise: Promise<boolean>;

    constructor()
    {
        this.promise = null;
    }

    public load(): Promise<boolean>
    {
        if (this.promise == null)
        {
            google.charts.load('current', {'packages': ['timeline', 'calendar']});
            this.promise = new Promise((resolve, reject) => { google.charts.setOnLoadCallback(() => resolve(true)) });
        }

        return this.promise;
    }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalAlertService {
    networkErrorSource = new Subject<string>();
    networkError$ = this.networkErrorSource.asObservable();

    constructor() {}

    announceNetworkError(error: string) {
        this.networkErrorSource.next(error);
    }
}

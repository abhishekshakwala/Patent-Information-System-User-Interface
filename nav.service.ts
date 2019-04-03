import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NavService {
    public appDrawer: any;
    public currentUrl = new BehaviorSubject<string>(undefined);
    public dashBoardMessage = new BehaviorSubject<string>('Welcome to Patent Information Reporting Dashboard!');

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    public closeNav() {
        this.appDrawer.close();
    }

    public openNav() {
        this.appDrawer.open();
    }
}

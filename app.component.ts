import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NavItems } from './navitems';
import { NavService } from './nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Patent Information System';

  @ViewChild('appDrawer') appDrawer: ElementRef;

  navItems: NavItems[] = [
      {
        displayName: 'Dashboard',
        route: 'app-dashboard'
      },
      {
        displayName: 'User Permissions',
        children: [
            {
                displayName: 'View Patent Records',
                route: 'app-display-grid'
            }
        ]
      }
    ];

  constructor(private navService: NavService) {
  }

  ngAfterViewInit(): void {
    this.navService.appDrawer = this.appDrawer;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  tabCount = 0;
  constructor() {}

  ngOnInit() {
    window.addEventListener('badgeCount', (e) =>  {
      console.log({e});
      //@ts-expect-error
      this.tabCount = e.detail;
    });
  }

}

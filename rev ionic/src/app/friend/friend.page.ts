import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage {

  person: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.person = this.router.getCurrentNavigation().extras.state.person;
      }
    });
  }

  getGoogleHref(address) {
    return `http://maps.google.com/maps?q=${ address.street_address }, ${ address.city }, ${ address.state } ${ address.zip_code }`;
  }

}

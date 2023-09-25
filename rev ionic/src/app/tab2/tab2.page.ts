import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AboutPage } from '../about/about.page';
import { PeopleService } from '../api/people.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  peopleList: Observable<any>;
  searchText = '';

  constructor(private people: PeopleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: ModalController) {}

  ngOnInit() {
    this.peopleList = this.people.getPeople(20);
  }

  goToFriend(person: any) {
    this.router.navigate(['friend'],
        { state: { person }, relativeTo: this.activatedRoute });
  }

  find(person: any) {
    return this.searchText.trim() === ''
      || `${ person.first_name } ${ person.last_name }`.toLowerCase()
      .includes(this.searchText.toLowerCase());
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: AboutPage
    });
    return await modal.present();
  }

}

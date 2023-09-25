import { Component, OnInit } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  text = '';
  rate = 1.5;
  idSequence = Math.floor(Math.random() * 10000);
  badgeCount = 3;

  constructor(private localNotifications: LocalNotifications,
    private tts: TextToSpeech,
    private badge: Badge) { }

  ngOnInit() {
    this.localNotifications.clearAll();
    App.addListener('appUrlOpen', (data: any) => {
      console.log('App opened with URL: ' +  data.url);
    });
    this.setBadgeCount();
  }

  nowNotif() {
    this.localNotifications.schedule({
      id: ++this.idSequence,
      text: `Now ILocalNotification id: ${this.idSequence}`,
    });
  }

  futureNotif() {
    this.localNotifications.schedule({
      id: ++this.idSequence,
      title: 'First App',
      text: `Future LocalNotification id: ${this.idSequence}`,
      trigger: {at: new Date(Date.now() + 4000)},
      // trigger: { in: 10, unit: 'second' },
      // led: 'FF0000',
      icon: '/assets/apple-icon-180/png',
      actions: [
          { id: 'yes', title: 'Yes' },
          { id: 'no',  title: 'No' }
      ],
      sound: 'file://assets/sound.mp3'
   });
  }

  speak() {
    this.tts.speak({
      text: this.text || 'you need to enter some text',
      rate: this.rate
    })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  setBadgeCount() {
    this.badge.set(this.badgeCount);
    if (this.badgeCount === 0) {
      this.badge.clear();
    }

    const evt = new CustomEvent('badgeCount', { detail: this.badgeCount });
    window.dispatchEvent(evt);
  }

  clearBadgeCount() {
    this.badgeCount = 0;
    this.setBadgeCount();
  }

}

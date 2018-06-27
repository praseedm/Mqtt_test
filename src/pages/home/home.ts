import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import {MqttService, IMqttMessage} from 'ngx-mqtt';
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {
  message : string = "def";
  private subs : Subscription;

  constructor(public navCtrl: NavController,
    private mqttService: MqttService) {

    console.log(this.mqttService);
    
    this.subs = this.mqttService.observe("first").subscribe(
      (message : IMqttMessage) => {
        console.log(message);
        this.message = message.payload.toString();
      }
    );

    this.mqttService.unsafePublish("first", "ngx");

  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

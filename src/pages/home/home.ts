import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import {MqttService, IMqttMessage} from 'ngx-mqtt';
import { Subscription } from 'rxjs'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {
  message : string = "";
  topic : string = "";
  author : string = "app : ";
  publishM : string = "";
  messageArray = [];
  temp: string="hai";

  private subs : Subscription;

  constructor(public navCtrl: NavController,
    private mqttService: MqttService) {

    console.log(this.mqttService);
    
    this.messageArray.push(this.temp);

  }

  public subscribe( topic : string){

    this.messageArray = [];
    this.subs = this.mqttService.observe(topic).subscribe(
      (message : IMqttMessage) => {
        console.log(message);
        this.message = message.payload.toString();
        this.messageArray.push(this.message);
      }
    );
  }

  public publish(topic:string, publishM:String) {
    this.mqttService.unsafePublish(topic, this.author + publishM);
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

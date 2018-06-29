import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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
  //temp: string="hai";

  private subs : Subscription;

  constructor(public navCtrl: NavController,
    private mqttService: MqttService, private _toastC : ToastController) {
    console.log(this.mqttService);     
  }

  public subscribe( topic : string){

    if(this.subs){
      this.unsubscribe();
    }
    this.messageArray = [];

    this.subs = this.mqttService.observe(topic).subscribe(
      (message : IMqttMessage) => {
        console.log(message);
        this.showToast();
        this.message = message.payload.toString();
        this.messageArray.push(this.message);
      });

  }

  public showToast(){
    let toast = this._toastC.create({
      message: 'new message',
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

  }

  public publish(topic:string, publishM:String) {
    this.mqttService.unsafePublish(topic, this.author + publishM);
  }

  public unsubscribe(){
    console.log("unsubscribe");
    this.subs.unsubscribe();
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

}

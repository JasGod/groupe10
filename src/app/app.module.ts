import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

export const firebaseConfig = {
  apiKey: 'AIzaSyD5mDzGfg2YGCl6ZzZiplVV_a2BpKVFAAA',
  authDomain: 'dev-mobile-groupe-7.firebaseapp.com',
  databaseURL:
    'https://dev-mobile-groupe-7-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'dev-mobile-groupe-7',
  storageBucket: 'dev-mobile-groupe-7.appspot.com',
  messagingSenderId: '713690664675',
  appId: '1:713690664675:web:9cab1f66fc4d29e532bfd6',
  measurementId: 'G-1GXB8NZW2P',
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot({
      name: 'userDB',
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB],
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmailComposer,
    LocalNotifications,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

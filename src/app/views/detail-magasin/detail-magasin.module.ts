import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMagasinPageRoutingModule } from './detail-magasin-routing.module';

import { DetailMagasinPage } from './detail-magasin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMagasinPageRoutingModule
  ],
  declarations: [DetailMagasinPage]
})
export class DetailMagasinPageModule {}

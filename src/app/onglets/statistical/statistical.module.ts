import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticalPageRoutingModule } from './statistical-routing.module';

import { StatisticalPage } from './statistical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticalPageRoutingModule
  ],
  declarations: [StatisticalPage]
})
export class StatisticalPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMagasinPage } from './detail-magasin.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMagasinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMagasinPageRoutingModule {}

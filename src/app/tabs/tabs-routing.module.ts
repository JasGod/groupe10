import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../onglets/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'statistical',
        loadChildren: () =>
          import('../onglets/statistical/statistical.module').then(
            (m) => m.StatisticalPageModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../onglets/about/about.module').then(
            (m) => m.AboutPageModule
          ),
      },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

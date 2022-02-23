import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./onglets/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },

  {
    path: 'statistical',
    loadChildren: () =>
      import('./onglets/statistical/statistical.module').then(
        (m) => m.StatisticalPageModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./onglets/about/about.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'detail-magasin/:id',
    loadChildren: () =>
      import('./views/detail-magasin/detail-magasin.module').then(
        (m) => m.DetailMagasinPageModule
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

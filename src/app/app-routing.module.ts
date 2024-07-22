import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

import { ResaleModule } from './resale/resale.module';
import { QDataModule } from './q-data/q-data.module';
import { NoContentComponent } from './no-content/no-content.component';
import { QdataFormComponent } from './q-data/Component/qdata-form/qdata-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    
    children:[
     
        {
          path: 'resale',
          loadChildren: () => import('./resale/resale.module').then(m => m.ResaleModule)
        },
        {
          path: 'q-data',
          loadChildren: () => import('./q-data/q-data.module').then(m => m.QDataModule)
        },
      {
        path: 'opportunity/identifiers',
        component: NoContentComponent,
      },
      {
        path: 'identifiers/opportunityID/:id',
        component: NoContentComponent,
      },
      {
        path: 'identifiers',
        component: NoContentComponent,
      },
      {
        path: 'opportunity/quoteLink',
        component: NoContentComponent,
      },
    ]
  },
  {
    path: 'fdg',
    component: QdataFormComponent,
    
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, QDataModule, ResaleModule],
})
export class AppRoutingModule {}

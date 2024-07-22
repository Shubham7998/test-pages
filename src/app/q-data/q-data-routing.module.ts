import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsQdataComponent } from './Component/details-qdata/details-qdata.component';
import { QdataFormComponent } from './Component/qdata-form/qdata-form.component';

const routes: Routes = [
  // { path: 'summary', component: SummaryQdataComponent },
  { path: 'summary/details', component: DetailsQdataComponent },
  { path: 'summary/details/:id', component: DetailsQdataComponent },
  {path:'summary/form',component:QdataFormComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QDataRoutingModule { }

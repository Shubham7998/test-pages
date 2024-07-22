import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryResaleComponent } from './Component/summary-resale/summary-resale.component';
import { DetailsComponent } from './Component/details/details.component';
import { QuotationFormComponent } from './Component/quotation-form/quotation-form.component';
import { SummaryCardComponent } from './Component/summary-card/summary-card.component';

const routes: Routes = [
  { path: 'summary', component: SummaryResaleComponent },
  { path: 'summary/details', component: DetailsComponent },
  { path: 'summary/details/:id', component: DetailsComponent },
  { path: 'quotationForm', component: QuotationFormComponent },
  { path: 'quotationForm/:id', component: QuotationFormComponent },
  { path: 'summary/summarycard', component: SummaryCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResaleRoutingModule {}

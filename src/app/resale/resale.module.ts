import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResaleRoutingModule } from './resale-routing.module';
import { SummaryResaleComponent } from './Component/summary-resale/summary-resale.component';
import { MatCardModule } from '@angular/material/card';
import { QuotationFormComponent } from './Component/quotation-form/quotation-form.component';
import { DetailsComponent } from './Component/details/details.component';

import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SummaryResaleComponent,
    QuotationFormComponent,
    DetailsComponent,
  ],

  imports: [
    CommonModule,
    // BrowserAnimationsModule ,
    ResaleRoutingModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class ResaleModule {}

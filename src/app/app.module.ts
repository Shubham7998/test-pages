import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { NoContentComponent } from './no-content/no-content.component';
import { OppHeadComponent } from './opp-head/opp-head.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { TestComponent } from './test/test.component';
import { ResaleModule } from './resale/resale.module';
import { QDataModule } from './q-data/q-data.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SummaryQdataComponent } from './q-data/Component/summary-qdata/summary-qdata.component';
import { DetailsQdataComponent } from './q-data/Component/details-qdata/details-qdata.component';
import { QdataFormComponent } from './q-data/Component/qdata-form/qdata-form.component';
import { BootstrapModalComponent } from './bootstrap-modal/bootstrap-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OppHeadComponent,
    LayoutComponent,
    SidebarComponent,
    OpportunityComponent,
    NoContentComponent,
    TestComponent,
    SummaryQdataComponent,
    DetailsQdataComponent,
    QdataFormComponent,
    BootstrapModalComponent,
  ],
  imports: [
    ResaleModule,
    QDataModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

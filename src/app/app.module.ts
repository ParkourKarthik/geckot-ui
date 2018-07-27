import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { DashboardsComponent, DashboardComponent } from './components/dashboards/dashboards.component';
import { DashboardService } from './services/dashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpModule, RequestOptions, BaseRequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ButtonsModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustExtBrowserXhr } from './cust-ext-browser-xhr';
import { MessageService } from './services/message.service';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        HttpClientModule,
        // ButtonsModule.forRoot(),
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
        // NgbModule
    ],
    declarations: [
        AppComponent,
        DashboardsComponent,
        DashboardComponent
    ],
    entryComponents: [
        DashboardComponent
    ],
    providers: [DashboardService, MessageService]
})
export class AppModule {

}

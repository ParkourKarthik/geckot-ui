import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './components/dashboards/dashboards.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
    { path: 'dashboards', component: DashboardsComponent },
    { path: '**', redirectTo: 'dashboards' }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
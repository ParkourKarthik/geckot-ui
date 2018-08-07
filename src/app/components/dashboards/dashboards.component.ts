import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dashboard, objResponse } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { inject } from '@angular/core/testing';
import { PartialObserver } from '../../../../node_modules/rxjs';

@Component({
    //moduleId: module.id,
    selector: 'my-dashboards',
    templateUrl: 'dashboards.component.html',
    styleUrls: ['dashboards.component.css'],
})

export class DashboardsComponent {

    public objDashboard: Dashboard;
    public dashboards: Dashboard[];
    errorMessage: string;
    dialogRef: MatDialogRef<any>;
    dashComp: DashboardComponent;

    constructor(public dialog: MatDialog, private _dashboardService: DashboardService) {

    }

    // Populate Dashboard list on load event
    ngOnInit() {
        this.objDashboard = { Name: null, _id: null };
        this.getDashboards();
    }

    openDialog(obj: Dashboard = new Dashboard()) {
        this.dialogRef = this.dialog.open(DashboardComponent, { data: obj });
        this.dialogRef.afterClosed().subscribe(result => {
            // this.dashboards.push(this.dialogRef.componentInstance.Name);
            this.getDashboards();
        });
    }

    openConfirmationDialog(message: string) {
        this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = message;
        return this.dialogRef.afterClosed();
    }

    editDashboard(Id: string) {
        console.log(Id);
        this._dashboardService.getSelectedUser(Id)
            .subscribe(
                val => this.objDashboard = val[0],
                err => console.log(err),
                () => this.openDialog(this.objDashboard)
            );
    }

    deleteDashboard(Id: string) {
        console.log(Id);
        this.openConfirmationDialog('Are you sure you want to delete?')
        .subscribe(result => {
            if (result) {
                this._dashboardService.deleteDashboard(Id)
                .subscribe(
                    val => console.log(val),
                    err => console.log(err),
                    () => this.getDashboards()
                );
            }
            this.dialogRef = null;
        });
    }

    // Populate Dashboard list
    getDashboards() {
        this._dashboardService.getDashboards()
            .subscribe(
                value => this.dashboards = value,
                error => this.errorMessage = <any>error);

        console.log(this.dashboards);
    }

}

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent {
    Name: string;
    ID: string;
    isSucess: boolean;
    errorMessage: string;
    public objDashboard: Dashboard;
    objRes: objResponse;
    constructor(public dialogRef: MatDialogRef<DashboardComponent>, private _dashboardService: DashboardService,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: Dashboard) {
        this.objDashboard = data;
    }

    submitDashboard() {
        //console.log(this.Name);
        if (this.objDashboard._id) {
            this._dashboardService.editDashboard(this.objDashboard)
                .subscribe(
                    data => {
                        console.log('Edited successfully');
                        this.dialogRef.close(true);
                    },
                    error => {
                        console.log(error);
                        //this.loading = false;
                    });
        } else if (this.objDashboard.Name != '' && this.objDashboard.Name != undefined) {
            this._dashboardService.addDashboard(this.objDashboard)
                .subscribe(
                    data => {
                        console.log('Added successfully');
                        this.dialogRef.close(true);
                    },
                    error => {
                        console.log(error);
                        //this.loading = false;
                    });
        }
    }
}


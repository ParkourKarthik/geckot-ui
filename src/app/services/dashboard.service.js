"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var Observable_1 = require("rxjs/Observable");
var DashboardService = /** @class */ (function () {
    function DashboardService(_http) {
        this._http = _http;
        this._dashboardUrl = 'http://localhost:3000/dashboards/';
    }
    DashboardService.prototype.getDashboards = function () {
        return this._http.get(this._dashboardUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DashboardService.prototype.addDashboard = function (Name) {
        //console.log(Name);
        return this._http.post(this._dashboardUrl, { Name: Name })
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    DashboardService.prototype.getSelectedUser = function (ID) {
        var myParams = new URLSearchParams();
        return this._http.get(this._dashboardUrl + 'getbyId/' + ID)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DashboardService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    DashboardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map
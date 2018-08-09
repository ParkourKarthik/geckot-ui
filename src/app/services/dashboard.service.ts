import { Injectable } from '@angular/core';
import { Dashboard, objResponse } from '../models/dashboard.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import 'rxjs/Rx';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { environment } from './../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class DashboardService {
    constructor(private http: HttpClient, private messageService: MessageService) { }
    private _dashboardUrl = environment.apiUrl + 'dashboards/';

    getDashboards(): Observable<Dashboard[]> {
        return this.http.get<Dashboard[]>(this._dashboardUrl)
            .pipe(
                tap(dashboards => this.log('fetched dashboards')),
                catchError(this.handleError('getDashboards', []))
            );
    }

    addDashboard(dashboard: Dashboard) {
        return this.http.post<Dashboard>(this._dashboardUrl, dashboard, httpOptions)
            .pipe(
                tap((dashboard: Dashboard) => this.log(`added dashboard w/ id=${dashboard._id}`)),
                catchError(this.handleError<Dashboard>('addDashboard'))
            );
    }


    editDashboard(dashboard: Dashboard) {
        return this.http.put<Dashboard>(this._dashboardUrl, dashboard, httpOptions)
            .pipe(
                tap((dashboard: Dashboard) => this.log(`edited dashboard w/ id=${dashboard._id}`)),
                catchError(this.handleError<Dashboard>('editDashboard'))
            );
    }

    deleteDashboard(ID: String) {
        return this.http.delete<Dashboard>(`${this._dashboardUrl}id/${ID}`, httpOptions)
            .pipe(
                tap((dashboard: Dashboard) => this.log(`edited dashboard w/ id=${dashboard._id}`)),
                catchError(this.handleError<Dashboard>('editDashboard'))
            );
    }

    getSelectedUser(ID: string) {
        return this.http.get<Dashboard>(`${this._dashboardUrl}id/${ID}`)
            .pipe(
                tap(_ => this.log(`fetched dashboard id=${ID}`)),
                catchError(this.handleError<Dashboard>(`getDashboard id=${ID}`))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a DashboardService message with the MessageService */
    private log(message: string) {
        this.messageService.add('DashboardService: ' + message);
    }


    // latest sample methods.
    // /** DELETE: delete the hero from the server */
    // deleteHero(hero: Hero | number): Observable<Hero> {
    //     const id = typeof hero === 'number' ? hero : hero.id;
    //     const url = `${this.heroesUrl}/${id}`;

    //     return this.http.delete<Hero>(url, httpOptions).pipe(
    //         tap(_ => this.log(`deleted hero id=${id}`)),
    //         catchError(this.handleError<Hero>('deleteHero'))
    //     );
    // }

    // /** PUT: update the hero on the server */
    // updateHero(hero: Hero): Observable<any> {
    //     return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    //         tap(_ => this.log(`updated hero id=${hero.id}`)),
    //         catchError(this.handleError<any>('updateHero'))
    //     );
    // }


}

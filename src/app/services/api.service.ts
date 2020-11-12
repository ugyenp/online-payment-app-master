import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { API_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // Get vehicle type
  getVehicleType(): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/vehicleType", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get vehicle details
  getVehicleDetails(vehicleTypeId, vehicleNumber): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/vehicleRegistrationDetails" + "/vehicleTypeId=" + `${vehicleTypeId}` + "&&" + "vehicleNumber=" + `${vehicleNumber}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Get rsta base location
  getRstabaseLocation(): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/baseOfficeDetail", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Get rsta region location
  getRstaRegionLocation(): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/regionDetails", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //get vehicle renewal duration
  getRenewalDurationDetails(vehicleTypeId): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/renewalConstantDetail/vehicleTypeId=" + `${vehicleTypeId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //get penalty constant
  getPenaltyAmount(Penalty_Id): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/penaltyConstantDetail/penaltyConstantId=" + `${Penalty_Id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Save application details
  proccedpayment(item, applicationType, serviceType, submittedTo): Observable<any> {
    return this.http
      .post<any>(`${API_URL}` + "/vehicleApplication/" +`${applicationType}`+"/"+`${serviceType}` + "/" + `${submittedTo}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Get replacement amount
  getReplacementAmount(vehicleTypeId): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/replacementAmount" + "/vehicleTypeId=" + `${vehicleTypeId}` , this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


}

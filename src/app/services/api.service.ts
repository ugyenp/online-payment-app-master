import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { API_URL, Online_Payment_API } from '../app.constant';

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

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Get vehicle details
  getVehicleDetails(vehicleTypeId, vehicleNumber): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/vehicleRegistrationDetails" + "/vehicleTypeId=" + `${vehicleTypeId}` + "&&" + "vehicleNumber=" + `${vehicleNumber}`, this.httpOptions)
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
      .post<any>(`${API_URL}` + "/vehicleApplication/" + `${applicationType}` + "/" + `${serviceType}` + "/" + `${submittedTo}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Get replacement amount
  getReplacementAmount(vehicleTypeId): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/replacementAmount" + "/vehicleTypeId=" + `${vehicleTypeId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //********************************From here new **************************
  getVehicleType(): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/vehicleTypes", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  vehicleRenewalDuration(vehicleTypeId): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/renewalDuration/" + `${vehicleTypeId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  rstaBaseOffice(): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/baseOffices", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  rstRregionalOffices(): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/regionalOffices", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  vehicleDetails(vehicle_number, vehicle_type_id): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/vehicleDetails/" + `${vehicle_number}` + "/" + `${vehicle_type_id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  drivingLicenseDetails(param_value, identity_type): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/drivingLicenseDetails/" + `${param_value}` + "/" + `${identity_type}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  learnerLicenseDetailsLLNumber(f_initial, ll_no): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/learnerLicenseDetailsLLNumber/" + `${f_initial}` + "/" +`${ll_no}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  learnerLicenseDetailsCidNumber(cid_number): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/learnerLicenseDetailsCidNumber/" + `${cid_number}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  amountDetails(url_param, identity_numbre): Observable<any> {
    return this.http
      .get<any>(`${API_URL}` + "/amount/"+ `${url_param}` +"/"+ `${identity_numbre}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  makePayment(service_type, item): Observable<any> {
    return this.http
      .post<any>(`${API_URL}` + "/makePayment/" + `${service_type}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  eralisPaymentVehicle(service_type, item): Observable<any> {
    return this.http
      .post<any>(`${Online_Payment_API}` + "/eralisPaymentVehicle/" + `${service_type}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  eralisPaymentLicense(service_type, item): Observable<any> {
    return this.http
      .post<any>(`${Online_Payment_API}` + "/eralisPaymentLicense/" + `${service_type}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  eralisPaymentLearnerLicense(service_type, item): Observable<any> {
    return this.http
      .post<any>(`${Online_Payment_API}` + "/eralisPaymentLearnerLicense/" + `${service_type}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getApplicationNumber(): Observable<any> {
    return this.http
      .get<any>(`${Online_Payment_API}` + "/getApplicationNumber", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
}

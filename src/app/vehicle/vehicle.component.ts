import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Paymentdetails } from '../model/paymentdetails';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  selected: any;
  vehicleTypeResponse: any;
  renewalDurationResponse: any;
  baseResponse: any;
  regionResponse: any;
  vf_initial: string;
  vm_initial: string;
  vl_initial: string;
  vl_number: string;
  vehicleNumber: string
  vehicleTypeName: string;
  vehicle_type_id: number;
  jusris_type_and_id:string;
  jusrisTypeId:number;
  jurisId:number;

  firstName: string;
  middleName: string;
  lastname: string;
  expiryDate: any;
  identityNumber:number;
  customerId:string;
  renewalDuration: number;
  penaltyAmount: number;
  amount: number;
  amountResponse: number;
  totalAmount: number;
  applicationNumber:string;

  urlParam: any;
  serviceTitle: string;
  showVehicleRenewalForm: boolean = false;
  showVehicleReplacementForm: boolean = false;
  serverError: string;
  errorMsg: string;
  paymentModel: Paymentdetails;

  constructor(
    private apiService: ApiService, public dialog: MatDialog, private route: ActivatedRoute
  ) {
    this.paymentModel = new Paymentdetails();
    this.route.params.subscribe(params => {
      this.urlParam = params.id;
      if (this.urlParam == "vehicle_renewal") {
        this.showVehicleRenewalForm = true;
        this.serviceTitle = "Renew your Vehicle Registration Certificate";
        this.showVehicleReplacementForm = false;
      } else if (this.urlParam == "vehicle_replacement") {
        this.serviceTitle = "Replace your Vehicle Registration Certificate";
        this.showVehicleReplacementForm = true;
        this.showVehicleRenewalForm = false;
      }
    });
  }

  ngOnInit(): void {
    this.getVehicleType();
  }

  getVehicleType() {
    this.apiService.getVehicleType().subscribe((response) => {
      this.vehicleTypeResponse = response;
    });
  }

  rstaRegionOffices() {
    this.apiService.rstRregionalOffices().subscribe((response) => {
      this.regionResponse = response;
    });
  }

  rstaBaseOffices() {
    this.apiService.rstaBaseOffice().subscribe((response) => {
      this.baseResponse = response;
    });
  }

  vehicleRenewalDuration() {
    this.apiService.vehicleRenewalDuration(this.vehicle_type_id).subscribe(response => {
      this.renewalDurationResponse = response;
    });
  }

  vehicleDetails() {
    this.vehicleNumber = this.vf_initial + "-" + this.vm_initial + "-" + this.vl_initial + this.vl_number;
    this.apiService.vehicleDetails(this.vehicleNumber, this.vehicle_type_id).subscribe(response => {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        if (response[0].First_Name !== null && response[0].expiryDate !== null) {
          this.firstName = response[0].First_Name;
          this.middleName = response[0].Middle_Name;
          this.lastname = response[0].Last_Name;
          this.expiryDate = response[0].expiryDate;
          this.identityNumber = response[0].Identity_Number;
          this.customerId = response[0].Customer_Id;
          this.vehicleRenewalDuration();
          this.rstaRegionOffices();
          this.rstaBaseOffices();
          this.renewalAmountDetails(this.identityNumber);
          this.replacementAmountDetails();
          this.errorMsg = null; this.serverError = null;
        }
      }
    }, error => { this.serverError = error; });
  }

  replacementAmountDetails(){
    this.apiService.amountDetails(this.urlParam, this.vehicle_type_id).subscribe(response => {
      for (var i = 0; i < response.length; i++) {
        if (response[0].Amount !== null) {
          this.amount = response[0].Amount;
          this.totalAmount = this.amount;
        }
        else { this.amount = null; }
      }
    });
  }

  renewalAmountDetails(identityNumber) {
    this.apiService.amountDetails(this.urlParam, identityNumber).subscribe(response => {
      console.log(response)
      for (var i = 0; i < response.length; i++) {
        if (response[0].maxPenalty !== null) {
          this.penaltyAmount = response[0].maxPenalty;
          this.amountResponse = response[0].Amount;
        }
        else { this.penaltyAmount = null; }
      }
    });
  }
  
  selectedRenewalDuration(renewalDuration) {
    if (this.amountResponse !== null) {
      this.amount = this.amountResponse * (renewalDuration / 12);
      this.totalAmount = +this.amount + +this.penaltyAmount;
    }
  }

  makePayment(serviceType){
    let str1 = this.jusris_type_and_id.split("-");
    this.jusrisTypeId = parseInt(str1[0].slice(0, 5));
    this.jurisId =parseInt( str1[1].slice(0, 5));
    this.paymentModel.amount = this.amount.toString();
    this.paymentModel.vehicle_Id = this.identityNumber;
    this.paymentModel.customer_Id = this.customerId;
    this.paymentModel.juris_type_id = this.jusrisTypeId;
    this.paymentModel.juris_id = this.jurisId;
    this.apiService.eralisPaymentVehicle(serviceType, this.paymentModel).subscribe(response => {
      console.log(response, "Successful");
      this.getApplicationNumber();
    }, error => {
      console.log("Something bad happened", error);
    });
  }

  getApplicationNumber(){
    this.apiService.getApplicationNumber().subscribe(response => {
      debugger;
     this.applicationNumber = response.application_Number;
    });
  }

}

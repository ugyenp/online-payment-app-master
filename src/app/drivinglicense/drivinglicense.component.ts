import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Paymentdetails } from '../../app/model/paymentdetails';

@Component({
  selector: 'app-drivinglicense',
  templateUrl: './drivinglicense.component.html',
  styleUrls: ['./drivinglicense.component.css']
})
export class DrivinglicenseComponent implements OnInit {
  urlParam: any;
  serviceTitle: string;
  selected: any;

  regionResponse: any;
  baseResponse: any;
  showDrivingLicenseRenewal: boolean = false;
  showDrivingLicenseReplacement: boolean = false;
  showCidForm: boolean = false;
  showLicenseNoForm: boolean = false;

  dl_initial: string;
  dl_number: string;
  license_number: string;
  firstName: string;
  identityNumber: number;
  identityValue: string;
  identityType: any;
  middleName: string;
  lastName: string;
  expiryDate: any;
  cid_number: string;
  renewalDuration: any;
  renewalDurationMonth:string;
  renewalDurationOrdinary: any;
  renawalDurationProfessional:any;
  renewalDurationWithoutCid: any;
  penaltyAmount:number;
  amountResponse:number;
  amount:number;
  totalAmount:number;
  cardCost:number;
  jusris_type_and_id:string;
  jusrisTypeId:number;
  jurisId:number;
  paymentModel:Paymentdetails;
  customerId:string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private apiservice: ApiService,
  ) {
    this.paymentModel = new Paymentdetails();
    this.route.params.subscribe(params => {
      this.urlParam = params.id;
      if (this.urlParam == "driving_license_renewal") {
        this.showDrivingLicenseRenewal = true;
        this.showDrivingLicenseReplacement = false;
        this.serviceTitle = "Driving License Renewal";
      } else if (this.urlParam == "driving_license_replacement") {
        this.showDrivingLicenseRenewal = false;
        this.showDrivingLicenseReplacement = true;
        this.serviceTitle = "Driving License Replacement";
      }
    });
  }

  ngOnInit(): void {
    this.renewalDurationOption();
  }

  renewalDurationOption() {
    this.renewalDurationOrdinary =
      [
        {"year":"5 years",  "month":60},
        {"year":"10 years", "month":120}
      ],

      this.renawalDurationProfessional =
      [
        {"year":"3 years",  "month":36},
      ],

      this.renewalDurationWithoutCid = [
        {"year":"1 years",  "month":12},
      ]
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  rstaRegionOffices() {
    this.apiservice.rstRregionalOffices().subscribe((response) => {
      this.regionResponse = response;
    });
  }

  rstaBaseOffices() {
    this.apiservice.rstaBaseOffice().subscribe((response) => {
      this.baseResponse = response;
    });
  }

  selectedForm(identityType) {
    if (identityType === "1") {
      this.showCidForm = true;
      this.showLicenseNoForm = false;
    } else if (identityType === "2") {
      this.showCidForm = false;
      this.showLicenseNoForm = true;
    }
  }

  drivingLicenseDetails() {
    this.license_number = this.dl_initial + "-" + this.dl_number;
    if (this.identityType === "1") { this.identityValue = this.cid_number; }
    else if (this.identityType === "2") { this.identityValue = this.license_number; }
    this.apiservice.drivingLicenseDetails(this.identityType, this.identityValue).subscribe(response => {
      this.firstName = response[0].First_Name;
      this.lastName = response[0].Last_Name;
      this.middleName = response[0].Middle_Name;
      this.expiryDate = response[0].Expiry_Date;
      this.license_number = response[0].Driving_License_No;
      this.identityNumber = response[0].Identity_Number;
      this.customerId = response[0].Customer_Id;
      this.renewalAmountDetails(this.identityNumber);
      this.replacementAmountDetails(this.identityNumber);
      if (response[0].CID_Number.length === 11 && response[0].CID_Number.match(/^[0-9]+$/)) {
        if (response[0].Driving_License_Type_Id === "N") {
          this.renewalDuration = this.renewalDurationOrdinary;
        } else if (response[0].Driving_License_Type_Id === "C") {
          this.renewalDuration = this.renawalDurationProfessional;
        }
      } else {
        this.renewalDuration = this.renewalDurationWithoutCid;
      }
    });
    this.rstaRegionOffices();
    this.rstaBaseOffices();
  }

  replacementAmountDetails(identityNumber){
    this.apiservice.amountDetails(this.urlParam, identityNumber).subscribe(response => {
      for (var i = 0; i < response.length; i++) {
        if (response[0].maxPenalty !== null) {
          this.cardCost = response[0].License_Card_Cost;
          this.amount = this.cardCost;
          this.totalAmount = this.cardCost;
        }
        else { this.penaltyAmount = null; }
      }
    });
  }

  renewalAmountDetails(identityNumber) {
    this.apiservice.amountDetails(this.urlParam, identityNumber).subscribe(response => {
      for (var i = 0; i < response.length; i++) {
        if (response[0].maxPenalty !== null) {
          this.penaltyAmount = response[0].maxPenalty;
          this.amountResponse = response[0].Amount;
          this.cardCost = response[0].License_Card_Cost;
        }
        else { this.penaltyAmount = null; }
      }
    });
  }

  selectedRenewalDuration(renewalDurationMonth) {
    debugger;
    if (this.amountResponse !== null) {
      this.amount = this.amountResponse * (renewalDurationMonth / 12);
      this.totalAmount = +this.amount + +this.penaltyAmount + + this.cardCost;
    }
  }

  makePayment(serviceType){
    let str1 = this.jusris_type_and_id.split("-");
    this.jusrisTypeId = parseInt(str1[0].slice(0, 5));
    this.jurisId =parseInt( str1[1].slice(0, 5));
    this.paymentModel.amount = this.amount.toString();
    this.paymentModel.customer_Id = this.customerId;
    this.paymentModel.juris_type_id = this.jusrisTypeId;
    this.paymentModel.juris_id = this.jurisId;
    this.paymentModel.driving_License_No = this.license_number;
    this.paymentModel.expiry_Date = this.expiryDate;
    this.paymentModel.license_Id = this.identityNumber.toString();
    this.paymentModel.renewal_Duration = this.renewalDurationMonth;
    this.paymentModel.app_Submission_Date =  new Date();
    this.paymentModel.region_Id = this.jurisId;
    this.paymentModel.penalty_Paid = this.penaltyAmount;
    this.apiservice.eralisPaymentLicense(serviceType, this.paymentModel).subscribe(response => {
      
      console.log(response, "saved successsfully")
    });
  }

}

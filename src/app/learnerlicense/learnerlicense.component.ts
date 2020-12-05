import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Paymentdetails } from '../model/paymentdetails';

@Component({
  selector: 'app-learnerlicense',
  templateUrl: './learnerlicense.component.html',
  styleUrls: ['./learnerlicense.component.css']
})
export class LearnerlicenseComponent implements OnInit {

  urlParam: any;
  serviceTitle: string;
  selected: any;
  regionResponse: any;
  baseResponse: any;
  selectedDetails: any;
  showCidForm: boolean = false;
  showLearnerLicenseNoForm: boolean = false;
  showLearnerLicenseRenewal: boolean = false;
  showLearnerLicenseReplacement: boolean = false;

  ll_initial: string;
  ll_number: string;
  firstName: string;
  middleName: string;
  lastName: string;
  expiryDate: string;
  learnerLicenseNumber: string;
  customerId: string;
  cidNumber: string;
  renewalDuration: string;
  renewalDurationMonth: number;
  learnerRenewalDurationYears: any;

  jusris_type_and_id:string;
  jusrisTypeId:number;
  jurisId:number;
  paymentModel: Paymentdetails;
  amount: number;
  totalAmount: number;
  identityNumber: number;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private apiService: ApiService) {
    this.paymentModel = new Paymentdetails();
    this.route.params.subscribe(params => {
      this.urlParam = params.id;
      if (this.urlParam == "learner_license_renewal") {
        this.showLearnerLicenseRenewal = true;
        this.showLearnerLicenseReplacement = false;
        this.serviceTitle = "Learner License Renewal";
      } else if (this.urlParam == "learner_license_replacement") {
        this.showLearnerLicenseRenewal = false;
        this.showLearnerLicenseReplacement = true;
        this.serviceTitle = "Learner License Replacement";
      }
    });
  }

  ngOnInit(): void {
    //this.renewalDurationOption();
  }

  renewalDurationOption() {
    this.learnerRenewalDurationYears = [
      { "year": "1" },
      { "year": "2" },
      { "year": "3" },
      { "year": "4" },
      { "year": "5" },
      { "year": "6" },
      { "year": "7" },
      { "year": "8" },
      { "year": "9" },
      { "year": "10" },
      { "year": "11" },
      { "year": "12" },
      { "year": "13" },
      { "year": "14" },
      { "year": "15" },
      { "year": "16" },
      { "year": "17" },
      { "year": "18" },
      { "year": "19" },
      { "year": "20" },
    ];
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

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  selectedForm(selectedDetails) {
    if (selectedDetails === "1") {
      this.showCidForm = true;
      this.showLearnerLicenseNoForm = false;
    } else if (selectedDetails === "2") {
      this.showCidForm = false;
      this.showLearnerLicenseNoForm = true;
    }
    this.rstaRegionOffices();
    this.rstaBaseOffices();
  }

  learnerLicenseDetails() {
    this.renewalDurationOption();
    if (this.selectedDetails === "1") {
      this.apiService.learnerLicenseDetailsCidNumber(this.cidNumber).subscribe(response => {
        this.firstName = response[0].First_Name;
        this.middleName = response[0].Middle_Name;
        this.lastName = response[0].Last_Name;
        this.learnerLicenseNumber = response[0].Learner_License_No;
        this.expiryDate = response[0].Expiry_Date;
        this.customerId = response[0].Customer_Id;
        this.replacementAmount();
      });
    } else if (this.selectedDetails === "2") {
      this.apiService.learnerLicenseDetailsLLNumber(this.ll_initial, this.ll_number).subscribe(response => {
        console.log(response)
        this.firstName = response[0].First_Name;
        this.middleName = response[0].Middle_Name;
        this.lastName = response[0].Last_Name;
        this.learnerLicenseNumber = response[0].Learner_License_No;
        this.expiryDate = response[0].Expiry_Date;
        this.customerId = response[0].Customer_Id;
        this.replacementAmount();
      });
    }
  }

  replacementAmount() {
    var identityNumber = 2;
    this.apiService.amountDetails(this.urlParam, identityNumber).subscribe(response => {
      this.amount = response[0].Amount;
      this.totalAmount = this.amount;
    });
  }

  renewalAmount(renewalDuration) {
    this.renewalDurationMonth = parseInt(renewalDuration) * 12;
    console.log(this.renewalDurationMonth)
    var identityNumber = 1;
    this.apiService.amountDetails(this.urlParam, identityNumber).subscribe(response => {
      this.amount = response[0].Amount * parseInt(renewalDuration);
      this.totalAmount = this.amount;
    });
  }

  makePayment(serviceType){
    debugger;
    let str1 = this.jusris_type_and_id.split("-");
    this.jusrisTypeId = parseInt(str1[0].slice(0, 5));
    this.jurisId = parseInt( str1[1].slice(0, 5));
    this.paymentModel.amount = this.amount.toString();
    this.paymentModel.customer_Id = this.customerId;
    this.paymentModel.juris_type_id = this.jusrisTypeId;
    this.paymentModel.juris_id = this.jurisId;
    this.paymentModel.learner_License_No = this.learnerLicenseNumber;
    this.paymentModel.expiry_Date = this.expiryDate;
    this.paymentModel.renewal_Duration = this.renewalDurationMonth.toString();
    this.paymentModel.app_Submission_Date =  new Date();
    this.paymentModel.region_Id = this.jurisId;
    this.apiService.eralisPaymentLearnerLicense(serviceType, this.paymentModel).subscribe(response => {
      console.log(response, "saved successsfully")
    });
  }

  
}

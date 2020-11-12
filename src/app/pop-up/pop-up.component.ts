import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationClass } from '../model/application-class';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  fullName: string;
  rcRenewal: any;
  penaltyAmount: any;
  totalAmount: any;

  confirm: any;
  alertMsg: string;
  showAlertMsg: boolean = false;

  applicationModel: ApplicationClass
  customerId: number;
  applicationType: string;
  renewalDuration: number;
  submittedTo: string;
  vehicleRegistrationId: number;
  serviceType: string;


  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.applicationModel = new ApplicationClass();
  }

  ngOnInit(): void {
    this.fullName = this.data.firstName + " " + this.data.middleName + " " + this.data.lastName;
    this.rcRenewal = "Nu. " + this.data.rcRenewal;
    this.penaltyAmount = "Nu. " + this.data.penalty;
    this.totalAmount = "Nu. " + this.data.total;
    this.customerId = this.data.customerId;
    this.applicationType = this.data.applicationType;
    this.renewalDuration = this.data.renawalDuration;
    this.submittedTo = this.data.submittedTo;
    this.vehicleRegistrationId = this.data.vechicleRegistrationId;
    this.serviceType = this.data.serviceType;


  }

  close(): void {
    this.dialogRef.close({
      // food: this.food
    });
  }

  proceedPayment(confirm) {
    if (confirm == 1) {
      this.proceedPaymentToSave();
      this.showAlertMsg = false;
      this.alertMsg = "";
      console.log("success");
    } else {
      this.showAlertMsg = true;
      this.alertMsg = "Please agree our terms to proceed your payment";
    }
  }

  //Proceed payment
  proceedPaymentToSave() {
    debugger;
    this.applicationModel.customer_Id = this.customerId;
    this.applicationModel.application_Type = this.applicationType;
    this.applicationModel.amount = this.totalAmount;
    this.applicationModel.renewal_Amount = this.rcRenewal;
    this.applicationModel.renewal_Duration = this.renewalDuration;
    this.applicationModel.vehicle_Id = this.vehicleRegistrationId
    this.apiService.proccedpayment(this.applicationModel, this.applicationType, this.serviceType, this.submittedTo).subscribe((response) => {
      console.log("Successful..................");
    });
  }



}

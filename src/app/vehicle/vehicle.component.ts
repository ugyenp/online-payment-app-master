import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";;
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { ApplicationClass } from '../model/application-class';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  isSearchSubmitted = false;
  searchForm: FormGroup;

  selected: any;
  vehicleType: string;
  vehicleTypeUser: string;
  vehicleNumber: string
  vehicleTypeName: string;

  firstName: string;
  middleName: string;
  lastname: string;
  expiryDate: any;

  rstabaseLocation: string;
  vehicleConstant: string;
  rstaregionlocation: string;
  renewaaldetails: string;
  rstaUserSelectedLocation: string;
  userSelectedRenewalDuration: number;

  amount: number;
  penaltyId: number = 4;
  penaltyAmount: number;
  totalAmount: number;
  vehicleRegistrationId: number;
  customerId: number;

  //Popup
  title = 'angular-material-modals';

  city: string;
  name: string;
  food_from_modal: string;
  msg: string;

  application_Type: string = "vehicle";
  service_Type: string = "renewal";

  applicationModel: ApplicationClass;

  urlParam: any;
  serviceTitle: string;
  showVehicleRenewalForm: boolean = false;
  showVehicleReplacementForm: boolean = false;
  vehicleRregistrationType: string;
  rcAmount: number;


  //selected: any;
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {

    this.applicationModel = new ApplicationClass();
    this.route.params.subscribe(params => {
      this.urlParam = params.id;
      if (this.urlParam == "vehicle_renewal_service") {
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
    this.searchForm = this.formBuilder.group({
      vehicleNumber: ['', [Validators.required]],
      vehicleTypeUser: ['', [Validators.required]]
    });
  }


  //Error controller funct5ion
  get errorControl() {
    return this.searchForm.controls;
  }

  //Get all vehicle type
  getVehicleType() {
    this.apiService.getVehicleType().subscribe((response) => {
      this.vehicleType = response;
    });
  }

  //Get vehicle details
  searchDetails(vehicleTypeUser, vehicleNumber) {
    this.isSearchSubmitted = true;
    if (!this.searchForm.valid) {
      console.log("enter required details");
    } else {
      this.getRstabaseLocation();
      this.getRegionDetails();
      //ge renewal duration description
      this.apiService.getRenewalDurationDetails(vehicleTypeUser).subscribe((response) => {
        this.renewaaldetails = response;
        console.log("renewal details", JSON.stringify(this.renewaaldetails));
      });

      //get replacement amount
      console.log(vehicleTypeUser);
      this.apiService.getReplacementAmount(vehicleTypeUser).subscribe((response) => {
        this.rcAmount = response[0].rc_Cost;
      });

      //Ge calculation constant
      this.apiService.getVehicleDetails(vehicleTypeUser, vehicleNumber).subscribe((response) => {
        debugger;
        this.userSelectedRenewalDuration;
        this.firstName = response.personalDetailEntity.first_Name;
        this.middleName = response.personalDetailEntity.middle_Name;
        this.lastname = response.personalDetailEntity.last_Name;
        this.vehicleTypeName = response.vehicleTypeEntity.vehicle_Type_Name;
        this.vehicleRegistrationId = response.vehicle_Reg_Dtls_Id;
        this.customerId = response.customer_Id;

        this.expiryDate = response.expiry_Date;
        const calculationConstantValue = response.vehicleTypeEntity.calculation_Constant;
        const value = response[calculationConstantValue];
        const responseLength = response.vehicleTypeEntity.vehicleConstant;


        //get owner naame and owner type
        if (response.vehicle_Registration_Type === "P") {
          this.vehicleRregistrationType = "Personal";
        } else if (response.vehicle_Registration_Type === "O") {
          this.vehicleRregistrationType = "Organisation";
        } else {
          this.vehicleRregistrationType = "";
        }


        for (let i = 0; i < responseLength.length; i++) {
          if (responseLength[i][calculationConstantValue] >= value && responseLength[i].flag == 0) {
            this.amount = responseLength[i].amount;
            break;
          } else if (responseLength[i][calculationConstantValue] < value && responseLength[i].flag == 1) {
            this.amount = responseLength[i].amount;
            break;
          } else {
            this.amount = responseLength[i].amount;
            break;
          }
        }

        //get penalty details 
        for (let i = 0; i < response.vehicleRenewal.length; i++) {
          if (response.vehicleRenewal != null) {
            this.expiryDate = new Date(response.vehicleRenewal[i].expiry_Date);
            let currentDate: any = new Date();
            if (currentDate > this.expiryDate) {
              let daysNumber: any = Math.floor((currentDate - this.expiryDate) / (1000 * 60 * 60 * 24));
              this.apiService.getPenaltyAmount(this.penaltyId).subscribe((response) => {
                let penaltyperDay = response.penalty_Per_Day;
                let maxPenalty = response.max_Penalty;
                let penaltyAmount = daysNumber * penaltyperDay;
                if (penaltyAmount <= maxPenalty) {
                  this.penaltyAmount = penaltyAmount;
                  this.totalAmount = penaltyAmount + this.amount;
                } else {
                  this.penaltyAmount = maxPenalty;
                  this.totalAmount = maxPenalty + this.amount;
                }
              });
            }

          } else {
            this.expiryDate = new Date(response.vehicleRenewal[i].expiry_Date);
            let currentDate: any = new Date();
            if (currentDate > this.expiryDate) {
              let daysNumber: any = Math.floor((currentDate - this.expiryDate) / (1000 * 60 * 60 * 24));
              this.apiService.getPenaltyAmount(this.penaltyId).subscribe((response) => {
                let penaltyperDay = response.penalty_Per_Day;
                let maxPenalty = response.max_Penalty;
                let penaltyAmount = daysNumber * penaltyperDay;
                if (penaltyAmount <= maxPenalty) {
                  this.penaltyAmount = penaltyAmount;
                  this.totalAmount = penaltyAmount + this.amount;
                } else {
                  this.penaltyAmount = maxPenalty;
                  this.totalAmount = maxPenalty + this.amount;
                }
              });
            }
          }
        }

      });
    }
  }

  //Get Rsta base location
  getRstabaseLocation() {
    this.apiService.getRstabaseLocation().subscribe((response) => {
      this.rstabaseLocation = response;
    });
  }

  // get rsta region details
  getRegionDetails() {
    this.apiService.getRstaRegionLocation().subscribe((response) => {
      this.rstaregionlocation = response;
    });
  }

  makePayment(rstaUserSelectedLocation, userSelectedRenewalDuration) {

    if (rstaUserSelectedLocation != this.selected && userSelectedRenewalDuration != this.selected) {
      this.openDialog();
    } else {
      this.msg = "Please select Renewal Duration and Submitted to in the Vehicle Details";
    }
  }

  //Pop up model
  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '600px',
      data: {
        firstName: this.firstName, middleName: this.middleName, lastName: this.lastname,
        vehicleType: this.vehicleTypeName, vehicleNumber: this.vehicleNumber, rcRenewal: this.amount,
        penalty: this.penaltyAmount, total: this.totalAmount, renawalDuration: this.userSelectedRenewalDuration,
        vechicleRegistrationId: this.vehicleRegistrationId, customerId: this.customerId,
        submittedTo: this.rstaUserSelectedLocation, applicationType: this.application_Type, serviceType: this.service_Type,
        penaltyAmount: this.penaltyAmount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.city = result;
      this.food_from_modal = result.food;
    });
  }
}

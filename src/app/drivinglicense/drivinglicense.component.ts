import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drivinglicense',
  templateUrl: './drivinglicense.component.html',
  styleUrls: ['./drivinglicense.component.css']
})
export class DrivinglicenseComponent implements OnInit {
  urlParam: any;
  serviceTitle: string;
  selected: any;
  showDrivingLicenseRenewal: boolean = false;
  showDrivingLicenseReplacement: boolean = false;

  selectedDetails: any;
  showCidForm: boolean = false;
  showLicenseNoForm: boolean = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
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

  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  drivingLicenseDetailsSearch(selectedDetails) {
    if (selectedDetails === "1") {
      this.showCidForm = true;
      this.showLicenseNoForm = false;
    } else if (selectedDetails === "2") {
      this.showCidForm = false;
      this.showLicenseNoForm = true;
    }
  }

}

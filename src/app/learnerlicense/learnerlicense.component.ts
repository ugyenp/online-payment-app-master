import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learnerlicense',
  templateUrl: './learnerlicense.component.html',
  styleUrls: ['./learnerlicense.component.css']
})
export class LearnerlicenseComponent implements OnInit {

  urlParam: any;
  serviceTitle: string;
  selected: any;
  selectedDetails: any;
  showCidForm: boolean = false;
  showLearnerLicenseNoForm: boolean = false;
  showLearnerLicenseRenewal: boolean = false;
  showLearnerLicenseReplacement: boolean = false;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {  
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

  searchLearnerLicenseDetails(selectedDetails){
    if(selectedDetails === "1"){
      this.showCidForm = true;
      this.showLearnerLicenseNoForm = false;
    } else if(selectedDetails === "2"){
      this.showCidForm = false;
      this.showLearnerLicenseNoForm = true;
    }
  }

}

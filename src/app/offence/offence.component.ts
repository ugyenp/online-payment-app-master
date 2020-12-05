import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offence',
  templateUrl: './offence.component.html',
  styleUrls: ['./offence.component.css']
})
export class OffenceComponent implements OnInit {
  selected:any;
  vf_initial:string;
  vm_initial:string;
  vl_initial:string;
  

  constructor() { }

  ngOnInit(): void {
  }

}

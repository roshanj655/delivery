import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DashboardService } from 'src/services/dashboard.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private dashService:DashboardService) { }
  showalert:boolean=false;
  bioSection = this.fb.group({
    id: "new",
    user: ["Customer"],
    status: ["0"],
    userDetails: this.fb.group({
      UserType: ['Customer'],
      Name: [''],
      Phone: [''],
      Address: [''],
      UserGrade: ['Primary'],
      City: [''],
      State: [''],
      Zip: [''],
      lat: [''],
      lng: [''],
      orderTime:Date(),
      comment: ['User can be Customer,Scout or Admin']
    }),
    pickDetails: this.fb.group({
      Date: [''],
      Name:[''],
      Phone:[''],
      Address: [''],
      City: [''],
      State: [''],
      Zip: [''],
      lat: [''],
      lng: [''],
      Comments: "pickDetails"
    }),
    dropDetails: this.fb.group({
      Date: [Date()],
      Name:[''],
      Phone:[''],
      Address: [''],
      City: [''],
      State: [''],
      Zip: [''],
      lat: [''],
      lng: [''],
      CashTopay:['1'],
      Comments: "pickDetails"
    })
  });
  ngOnInit(): void {
    
  }
  callingFunction() {
    
    var address=this.bioSection.value.userDetails.Address+","+this.bioSection.value.userDetails.City+","+this.bioSection.value.userDetails.State+","+this.bioSection.value.userDetails.Zip;
    var paddress=this.bioSection.value.pickDetails.Address+","+this.bioSection.value.pickDetails.City+","+this.bioSection.value.pickDetails.State+","+this.bioSection.value.pickDetails.Zip;
    var daddress=this.bioSection.value.dropDetails.Address+","+this.bioSection.value.dropDetails.City+","+this.bioSection.value.dropDetails.State+","+this.bioSection.value.dropDetails.Zip;
    this.dashService.getlatlang(address).subscribe(data=>{
       this.bioSection.value.userDetails.lat=data.results[0].geometry.lat.toString();
      this.bioSection.value.userDetails.lng=data.results[0].geometry.lng.toString();
      this.dashService.getlatlang(paddress).subscribe(data=>{
        this.bioSection.value.pickDetails.lat=data.results[0].geometry.lat.toString();
       this.bioSection.value.pickDetails.lng=data.results[0].geometry.lng.toString();
      })
      this.dashService.getlatlang(daddress).subscribe(data=>{
        this.bioSection.value.dropDetails.lat=data.results[0].geometry.lat.toString();
       this.bioSection.value.dropDetails.lng=data.results[0].geometry.lng.toString();
      })
      console.log(this.bioSection.value);
    this.dashService.addorders(this.bioSection.value).subscribe(data=>{
      //this.messages=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
      console.log(data);
      this.showalert=true;
      //this.bioSection.reset();
    });
    })
    
   }
   close()
      {
        this.showalert=false;
      }
}

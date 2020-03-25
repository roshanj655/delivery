import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-add-scouts',
  templateUrl: './add-scouts.component.html',
  styleUrls: ['./add-scouts.component.scss']
})

export class AddScoutsComponent implements OnInit {
  bioSection = this.fb.group({
    id: ['Scout_01'],
    user: [''],
    userDetails: this.fb.group({
      UserType: ['Scout'],
      Address: [''],
      UserGrade: ['Primary'],
      City: [''],
      State: [''],
     Zip: [''],
      comment: ['User can be Customer,Scout or Admin']
    }),
    ScoutLocation: this.fb.group({
        lat: ["25"],
    lng: ["27"]
    })
  });
  showalert: boolean=false;
  constructor(private fb: FormBuilder, private dashService:DashboardService) { 
   
  }

  ngOnInit(): void {
    //this.callingFunction()
    
  }
  callingFunction() {
    
    var address=this.bioSection.value.userDetails.Address+","+this.bioSection.value.userDetails.City+","+this.bioSection.value.userDetails.State+","+this.bioSection.value.userDetails.Zip;
    this.dashService.getlatlang(address).subscribe(data=>{
      //   this.bioSection.value.userDetails.lat=data.results[0].geometry.lat.toString();
      //  this.bioSection.value.userDetails.lng=data.results[0].geometry.lng.toString();
       this.bioSection.value.ScoutLocation.lat=data.results[0].geometry.lat.toString();
       this.bioSection.value.ScoutLocation.lng=data.results[0].geometry.lng.toString();
      console.log(this.bioSection.value);
    this.dashService.addScouts(this.bioSection.value).subscribe(data=>{
      //this.messages=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
      console.log(data)
      this.showalert=true;
      this.bioSection.reset();
    });
    })
    
   }
   close()
      {
        this.showalert=false;
      }
}

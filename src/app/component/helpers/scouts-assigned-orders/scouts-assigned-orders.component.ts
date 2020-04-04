import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DashboardService } from 'src/services/dashboard.service';
@Component({
  selector: 'app-scouts-assigned-orders',
  templateUrl: './scouts-assigned-orders.component.html',
  styleUrls: ['./scouts-assigned-orders.component.scss']
})
export class ScoutsAssignedOrdersComponent implements OnInit {
  @Input() onGoingOrder;
  @Input() scout;
  ordersPChange:any=[];
  constructor(private dashService:DashboardService) { }
  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.onGoingOrder, event.previousIndex, event.currentIndex);
    this.ordersPChange=[];
    this.scout.fcmtoken="newOrderForScout";
    this.onGoingOrder.forEach(element => {
      this.scout.userDetails.task.forEach(scoutElement => {
        if(scoutElement.orderId==element.id)
        {
          this.ordersPChange.push(scoutElement);
        }
      })
      //this.ordersPChange.push(element.id);
    });
    this.scout.userDetails.task=this.ordersPChange;
    //this.scout.ScoutLocation.lng=this.scout.ScoutLocation.lng.toString();
    //this.scout.ScoutLocation.lat=this.scout.ScoutLocation.lat.toString();
    //console.log(this.scout);
    this.dashService.addScouts(this.scout).subscribe(data=>{
      //this.messages=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
      //console.log(data)
    });
  }
  assigntask()
  {
    
  }

  ngOnInit(): void {
  }

}

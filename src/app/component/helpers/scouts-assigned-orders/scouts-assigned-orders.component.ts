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
  @Input() completedOrder;
  @Input() scout;
  keepGoing:boolean;
  ordersPChange:any=[];
  showTitle:boolean=false;
  constructor(private dashService:DashboardService) { }
  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.onGoingOrder, event.previousIndex, event.currentIndex);
    this.ordersPChange=[];
    console.log(this.onGoingOrder);
    this.scout.fcmtoken="newOrderForScout";
    this.onGoingOrder.forEach(element => {
      this.keepGoing=true;
      this.scout.userDetails.task.forEach(scoutElement => {
        if(this.keepGoing){
        if(scoutElement.orderId==element.orderid)
        {
          if(element.Type=='drop' && scoutElement.type=="drop")
          {
          this.ordersPChange.push(scoutElement);
          this.keepGoing=false;
          }
          if(element.Type=='pickup' && scoutElement.type=="pick")
          {
          this.ordersPChange.push(scoutElement);
          this.keepGoing=false;
          }
        }
      }
      })
      //this.ordersPChange.push(element.id);
    });
    this.scout.userDetails.task=this.ordersPChange;
    this.scout.ScoutLocation.lng=this.scout.ScoutLocation.lng.toString();
    this.scout.ScoutLocation.lat=this.scout.ScoutLocation.lat.toString();
    console.log(this.scout);
    this.dashService.addScouts(this.scout).subscribe(data=>{
      //this.messages=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
      console.log(data)
    });
  }
  assigntask()
  {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.onGoingOrder[0])
    {
    this.showTitle=true;}
  }

  ngOnInit(): void {
  }

}

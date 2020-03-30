import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scouts-table',
  templateUrl: './scouts-table.component.html',
  styleUrls: ['./scouts-table.component.scss']
})
export class ScoutsTableComponent implements OnInit {
  headers:any;
  @Input() scouts:any;
  @Input() ongoingorders:any;
  @Output() sOrders = new EventEmitter<any>();
  @Output() cScout = new EventEmitter<any>();
  itenary: any=[];
  scout:any;
  prioritySetData:any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("table",this.scouts);
  }
  openite(orderdata,scouts)
      {
        this.itenary=[];
        this.scout=scouts;

        scouts.userDetails.orderid.forEach(element1 => {
          orderdata.forEach(element => {
            if(element1==element.id )
            {
            this.itenary.push(element);
            }
          });
        });
        this.sOrders.emit({"oData":this.itenary,"sData":this.scout});
        console.log(this.itenary);
      }
      openmodal(data)
      {
        console.log(data);
        this.cScout.emit(data);
      }
  ngOnInit(): void {
    console.log("table",this.scouts);
    this.headers=[
      "Name",
      "Address",
      "City",
      "State",
      "Tasks",
      "Assign"
    ];
  }

}

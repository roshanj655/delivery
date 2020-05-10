import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import * as $ from 'jquery';
import { MessagingService } from 'src/app/messaging.service';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators'; 
declare const google: any;
const markerImage = 'assets/images/marker.png';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  constructor(private dashService:DashboardService,private messagingService: MessagingService,private elRef:ElementRef) { }
  scouts:any=[];
  neworders:any=[];
  ongoingorders:any=[];
  completeorders:any=[];
  allorders:any=[];
  itenary:any=[];
  scoutTableData:any=[];
  scout:any;
  map:any;
  message;
  singleScouts:any={};
  cOrder:any;
  orderCheck:any[];
  sTableShow:boolean=false;
  showCompleteBut:boolean=false;
  succesmsg:string;
  ordertype:string;
  x:number=200;
  myLatLng:any = {lat: 28.41252, lng: 77.31977};
  
  showalert:boolean=false;
  
    markers:any=[];
    public ngOnInit(){
      this.getdata();
      
      $('.tabs').on('click','li',function(){
        
        var tab=$(this).attr('data');
        $(".tab").hide();
        $('.tabs li').removeClass('active')
        $(this).addClass('active');
        $("."+tab).show();
      })

      timer(1000, 1000*60*5).pipe(
        take(300)).subscribe(x=>{
         // do here whatever you want to do here
         this.checkOrderTime();
         })

    }
    getdata(){
      this.dashService.getOrders().subscribe(data=>{
        this.allorders=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
      });
      this.dashService.getOrdersbyStatus(0).subscribe(data=>{
        this.neworders=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
        this.checkOrderTime();
      });
      this.dashService.getOrdersbyStatus(1).subscribe(data=>{
        this.ongoingorders=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
        //console.log(this.messages)
      });
      this.dashService.getOrdersbyStatus(2).subscribe(data=>{
        this.completeorders=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
        //console.log(this.messages)
      });
      
    }
    public ngAfterViewInit() {
     
      this.dashService.getScouts().subscribe(data=>{
        this.scouts=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
        this.markers=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
        this.initmap(this.myLatLng);
      });
      const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    
    }
    locatOnGoingTask(taskData,type)
    {
      this.cOrder=taskData;
      //taskData=type=='pickDetails'?taskData.pickDetails:taskData.dropDetails;
      this.showCompleteBut=true;
      this.sTableShow=true;
     this.scoutTableData=this.scouts;
     this.ongoingorders=this.ongoingorders;
      
      console.log(taskData);
     $("#oid").val(JSON.stringify(taskData));
     document.querySelector('.map__target-title').innerHTML = taskData.Name?taskData.Name:"NA";
     document.querySelector('.map__pickup-location').innerHTML = `<i class=\"material-icons\">room</i>${taskData.Address},${taskData.City?taskData.City:'NA'},${taskData.State?taskData.State:"NA"}`;
     document.querySelector('.map__target-opening-hours').innerHTML = `<i class=\"material-icons\">date_range</i>${taskData.Date}`;

      this.initmap({lat:parseFloat(taskData.lat),lng:parseFloat(taskData.lng)});
      //this.addmarker({lat:parseFloat(taskData.dropDetails.lat),lng:parseFloat(taskData.dropDetails.lng)});
     
    }
    locatTask(taskData,type)
    {
      this.cOrder=taskData;
      this.ordertype=type;
     // taskData=type=='pickDetails'?taskData.pickDetails:taskData.dropDetails;
      this.showCompleteBut=false;
      this.sTableShow=true;
     this.scoutTableData=this.scouts;
     this.ongoingorders=this.ongoingorders;
     $("#oid").val(JSON.stringify(taskData));
              document.querySelector('.map__target-title').innerHTML = taskData.Name?taskData.Name:"NA";
              document.querySelector('.map__pickup-location').innerHTML = `<i class=\"material-icons\">room</i>${taskData.Address},${taskData.City?taskData.City:'NA'},${taskData.State?taskData.State:"NA"}`;
              document.querySelector('.map__target-opening-hours').innerHTML = `<i class=\"material-icons\">date_range</i>${taskData.Date}`;
              
      this.initmap({lat:parseFloat(taskData.pickDetails.lat),lng:parseFloat(taskData.pickDetails.lng)});
      //this.addmarker({lat:parseFloat(taskData.dropDetails.lat),lng:parseFloat(taskData.dropDetails.lng)});
      
    }
    
    getSdataFromAssignBut(sData)
    {
      this.singleScouts=sData;
      $("#sdata").val(JSON.stringify(sData));
    }
    getSItenary(data)
    {
      this.itenary=data.oData;
      this.scout=data.sData;
    }
    initmap(mylatlang){
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: mylatlang,
        zoom: 15
      });
      this.addmarker(mylatlang);
      
     this.markers.forEach(element => {
       
       if(element.ScoutLocation) {
         
          var dis=this.distance(mylatlang.lat, mylatlang.lng,parseFloat(element.ScoutLocation.lat), parseFloat(element.ScoutLocation.lng),'K');
      
          if(dis<=this.x)
         {
          console.log('scout',element.ScoutLocation);
          this.addmarker(element);
         }
        }
     });
    }
    addmarker(prop)
        {
          if(prop.ScoutLocation)
          {
          prop.ScoutLocation.lat=parseFloat(prop.ScoutLocation.lat);
          prop.ScoutLocation.lng=parseFloat(prop.ScoutLocation.lng);
          }
        var marker = new google.maps.Marker({
            position: prop.ScoutLocation?prop.ScoutLocation:prop,
            map: this.map,
        });
        if(prop.ScoutLocation){
          // Set icon image
          marker.setIcon(markerImage);
        }
        else{
          marker.setIcon('assets/images/active_marker.png');
        }
        if(prop.ScoutLocation){
          var infoWindow = new google.maps.InfoWindow({
            content:prop.content
          });
  
          marker.addListener('click', function(){
             document.querySelector('.map__target-picture').classList.toggle('map__target-picture--hide');
          document.querySelector('.map__target-info').classList.toggle('map__target-info--hide');
          setTimeout(
            () => {
              document.querySelector('.map__target-title').innerHTML = prop.user;
              document.querySelector('.map__target-location').innerHTML = `<i class=\"material-icons\">room</i>${prop.location}`;
              document.querySelector('.map__target-opening-hours').innerHTML = `<i class=\"material-icons\">query_builder</i>${prop.userDetails.Address},${prop.userDetails.City},${prop.userDetails.State}`;
              document.querySelector('.map__target-description').innerHTML = `${prop.description} <input type="hidden" id="sdata"> <button id="astask" data="`+JSON.stringify(prop)+`"  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-light-blue"  data-toggle="modal" data-target="#myModal">assign task</button>`;
              (document.querySelector('.map__target-picture') as HTMLElement).style.backgroundPositionX = prop.image;
              document.querySelector('.map__target-picture').classList.toggle('map__target-picture--hide');
              document.querySelector('.map__target-info').classList.toggle('map__target-info--hide');
              
              document.getElementById("astask").addEventListener('click',()=>{
                $("#sdata").val(JSON.stringify(prop));
                $("#name").html(prop.user);
                $("#add").html(prop.userDetails.Address);
                $("#city").html(prop.userDetails.City);
                $("#state").html(prop.userDetails.State);
                $("#grade").html(prop.userDetails.UserGrade);
                $("#task").html(prop.userDetails.orderid);
              })

            },
            200,
          );
          
          });
         //marker.addListener('click', this.showInfo());
        }
      }
     
      completeTask()
      {
        var order=JSON.parse($("#oid").val());
        order.status="2";
        this.dashService.addorders(order).subscribe(data=>{
          //this.messages=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
          console.log(data)
          this.getdata();
        });
        this.showalert=true;
        this.succesmsg="Task marked as complete";
      }

      assigntask()
      {
        var a=JSON.parse($(document).find("#sdata").val());
        var order=JSON.parse($("#oid").val());
        if(order.status!="0"){
          alert('Please select new Order to assign');
        }
        else {
        a.ScoutLocation.lng=typeof a.ScoutLocation.lng=='string'?a.ScoutLocation.lng:a.ScoutLocation.lng.toString();
        a.ScoutLocation.lat=typeof a.ScoutLocation.lat=='string'?a.ScoutLocation.lat:a.ScoutLocation.lat.toString();
        a.fcmtoken="newOrderForScout";
       if(this.ordertype=='pick')
       {
           order.pickDetails.status="1";
          var OrderDataForTask=order.pickDetails;
       }
       else
       {
        order.dropDetails.status="1";
        var OrderDataForTask=order.dropDetails;
       }
        var newtask={
          orderId:order.id,
          date:Date.now(),
          Phone:OrderDataForTask.Phone,
          lat:OrderDataForTask.lat,
          lng:OrderDataForTask.lng,
          address:OrderDataForTask.Address,
          city:OrderDataForTask.City,
          state:OrderDataForTask.State,
          zip:OrderDataForTask.Zip,
          cashtocollect:100,
          status:0,
          type:this.ordertype,
        };
        a.pickDetails={"lat":order.pickDetails.lat,"lng":order.pickDetails.lng};
        a.dropDetails={"lat":order.dropDetails.lat,"lng":order.dropDetails.lng};
        if($.isArray(a.userDetails.task))
        {
          a.userDetails.task.push(newtask);
        }
        else{
          a.userDetails.task=[newtask];
        }
       //console.log(a);
        //order.status="1";
        
        this.dashService.addScouts(a).subscribe(data=>{
          this.dashService.getScouts().subscribe(data=>{
            this.scouts=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
            this.scoutTableData=[];
            this.scoutTableData=this.scouts;
            this.dashService.addorders(order).subscribe(data=>{
              //this.messages=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
              console.log(data);
              //this.bioSection.reset();
            });
          });
        });
        //console.log(order);
        // this.dashService.addorders(order).subscribe(data=>{
        //   this.getdata();
        // });
        this.showalert=true;
        this.succesmsg="Task assigned to scout";
      }
      }
      close()
      {
        this.showalert=false;
      }

      checkOrderTime(){
        this.neworders.forEach(element => {
          var d= new Date();
          //d.setMinutes( d.getMinutes() + 5 );
          var otime=new Date(Date.parse(element.userDetails.orderTime));
          otime.setMinutes( otime.getMinutes() + 5 );
          if (d.getTime() > otime.getTime()) 
          {
            element.classprop="highlight";
          }
       });
      }

    distance(lat1, lon1, lat2, lon2, unit) {
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
      }
    }

}

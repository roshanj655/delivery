import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import * as $ from 'jquery';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { element } from 'protractor';
import { MessagingService } from 'src/app/messaging.service';
import { HttpClient } from '@angular/common/http';
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
  itenary:any=[];
  scoutTableData:any=[];
  scout:any;
  map:any;
  message;
  singleScouts:any={};
  x:number=80;
  myLatLng:any = {lat: 28.41252, lng: 77.31977};
  
  showalert:boolean=false;
  
    markers:any=[];
    public ngOnInit(){
      this.getdata();
      // this.dashService.getlatlang("old faridabad, haryana").subscribe(data=>{
      //   //console.log(data.results[0].geometry);
      // })
      $('.tabs').on('click','li',function(){
        
        var tab=$(this).attr('data');
        $(".tab").hide();
        $('.tabs li').removeClass('active')
        $(this).addClass('active');
        $("."+tab).show();
      })


    }
    getdata(){
      this.dashService.getOrdersbyStatus(0).subscribe(data=>{
        this.neworders=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
        //console.log(this.neworders);
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
    locatTask(taskData)
    {
     this.scoutTableData=this.scouts;
     this.ongoingorders=this.ongoingorders;
     $("#oid").val(JSON.stringify(taskData));
              document.querySelector('.map__target-title').innerHTML = taskData.user;
              document.querySelector('.map__pickup-location').innerHTML = `<i class=\"material-icons\">room</i>${taskData.pickDetails.Address},${taskData.pickDetails.City},${taskData.pickDetails.State}`;
              document.querySelector('.map__target-location').innerHTML = `<i class=\"material-icons\">room</i>${taskData.dropDetails.Address},${taskData.dropDetails.City},${taskData.dropDetails.State}`;
              document.querySelector('.map__target-opening-hours').innerHTML = `<i class=\"material-icons\">date_range</i>${taskData.pickDetails.Date}`;
              
      this.initmap({lat:parseFloat(taskData.pickDetails.lat),lng:parseFloat(taskData.pickDetails.lng)});
      this.addmarker({lat:parseFloat(taskData.dropDetails.lat),lng:parseFloat(taskData.dropDetails.lng)});
      
    }
    getSdataFromAssignBut(sData)
    {
      this.singleScouts=sData;
      $("#sdata").val(JSON.stringify(sData));
    }
    getSItenary(data)
    {
      console.log(data);
      this.itenary=data.oData;
      this.scout=data.sData;
    }
    scoutDetails(scoutData)
    {
      console.log(scoutData);
      
     document.querySelector('.map__target-title').innerHTML = scoutData.user;
     document.querySelector('.map__target-location').innerHTML = `<i class=\"material-icons\">room</i>${scoutData.userDetails.Address},${scoutData.userDetails.City},${scoutData.userDetails.State}`;
     document.querySelector('.map__target-opening-hours').innerHTML = `<i class=\"material-icons\">query_builder</i>${scoutData.userDetails.orderid}`;
     document.querySelector('.map__target-description').innerHTML = `${scoutData.description} <input type="hidden" id="sdata"> <button id="astask" data="`+JSON.stringify(scoutData)+`"  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-light-blue"  data-toggle="modal" data-target="#myModal">assign task</button>`;
     (document.querySelector('.map__target-picture') as HTMLElement).style.backgroundPositionX = scoutData.image;
     document.querySelector('.map__target-picture').classList.toggle('map__target-picture--hide');
     document.querySelector('.map__target-info').classList.toggle('map__target-info--hide');
     
     document.getElementById("astask").addEventListener('click',()=>{
       $("#sdata").val(JSON.stringify(scoutData));
      this.singleScouts=scoutData;
     })
     
      
    }
    initmap(mylatlang){
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: mylatlang,
        zoom: 15
      });
      this.addmarker(mylatlang);
      
     this.markers.forEach(element => {
       element.f=function()
       {
         this.assigntask.call(this,element);
       }
          var dis=this.distance(mylatlang.lat, mylatlang.lng,parseFloat(element.ScoutLocation.lat), parseFloat(element.ScoutLocation.lng),'K');
         if(dis<=this.x)
         {
             // element.content=dis+" KM";
         // console.log('newdata',element);
          this.addmarker(element);
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
     
     

      assigntask()
      {
        var a=JSON.parse($(document).find("#sdata").val());
        var order=JSON.parse($("#oid").val());
        a.ScoutLocation.lng=a.ScoutLocation.lng.toString();
        a.ScoutLocation.lat=a.ScoutLocation.lat.toString();
        if($.isArray(a.userDetails.orderid))
        {
          a.userDetails.orderid.push(order.id);
           
        }
        else{
          a.userDetails.orderid=[order.id];
        }
       
        order.status=1;
        this.dashService.addScouts(a).subscribe(data=>{
          //this.messages=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
          console.log(data)
        });
        this.dashService.addorders(order).subscribe(data=>{
          //this.messages=data.body.Items.sort((a, b) => (a.id < b.id) ? 1 : -1);
          console.log(data)
          this.getdata();
        });
        this.showalert=true;
        //$('#myModal').modal('hide');
        //console.log(data);
      }
      close()
      {
        this.showalert=false;
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

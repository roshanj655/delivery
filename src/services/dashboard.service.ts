import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private apiUrl=environment.apiBaseUrl;
 
  constructor(private http: HttpClient) {
    
   }

  getOrders():Observable<any>{
    return this.http.get(this.apiUrl+"orders");
  }
  getOrdersbyStatus(status):Observable<any>{
    return this.http.get("https://lukuucm71l.execute-api.ap-south-1.amazonaws.com/startJhutpat/order?status="+status);
  }
  getScouts():Observable<any>{
    return this.http.get(this.apiUrl+"scouts");
  }
  getlatlang(loc):Observable<any>{
    return this.http.get("https://api.opencagedata.com/geocode/v1/json?q="+loc+"&key=53d74e25e2d64f76b8e16aa3cbdc97cb&language=en&pretty=1");
  }

  addScouts(data):Observable<any>{
    return this.http.post<any>(this.apiUrl+"scouts", data, httpOptions)
    .pipe(
      //catchError(this.handleError('addHero', hero))
    );
  }
  addorders(data):Observable<any>{
    return this.http.post<any>("https://cszvs5ey5k.execute-api.ap-south-1.amazonaws.com/startJhutpat/customerorder", data, httpOptions)
    .pipe(
      //catchError(this.handleError('addHero', hero))
    );
  }
}

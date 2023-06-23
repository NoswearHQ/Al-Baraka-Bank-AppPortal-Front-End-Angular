import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {rqAuth} from './model/rqAuth';

@Injectable({
  providedIn: 'root'
})
export class KYCService {
  rq : rqAuth = new rqAuth;
  private url='http://localhost:8020/TWSKYCPPModel';
  private url1='http://localhost:8030/TWSKYCPModel';
  constructor(private  http: HttpClient )
   { 
    this.rq.company="";
    this.rq.password="";
    this.rq.userName="";
    this.rq.columnName="";
    this.rq.criteriaValue="";
    this.rq.operand="";
    
    
   }
   ExtractCustomer(id): Observable<any>
   {
     
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type':  'application/xml',
         'Authorization': 'jwt-token'
       })
     };
 
     this.rq.company="********";// Private data 
     this.rq.password="*******";// Private data 
     this.rq.userName="NOSWEAR";
     this.rq.columnName="ID";
     this.rq.criteriaValue=id;
     this.rq.operand="EQ";
   
 
 
     
     console.log(this.rq);
     return this.http.post(this.url,this.rq) .pipe(map(user => {
       return user;
   
     }));
   };
   ExtractPM(id): Observable<any>
   {
     
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type':  'application/xml',
         'Authorization': 'jwt-token'
       })
     };
 
     this.rq.company="********";
     this.rq.password="*****";// Private data
     this.rq.userName="NOSWEAR";
     this.rq.columnName="ID";
     this.rq.criteriaValue=id;
     this.rq.operand="EQ";
   
 
 
     
     console.log(this.rq);
     return this.http.post(this.url1,this.rq) .pipe(map(user => {
       return user;
   
     }));
   };
 
 
}

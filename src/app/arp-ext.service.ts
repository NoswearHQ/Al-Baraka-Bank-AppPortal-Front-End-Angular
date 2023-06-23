import { Injectable } from '@angular/core';
import{ARPModel} from './model/ARPModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {rqAuth} from './model/rqAuth';
@Injectable({
  providedIn: 'root'
})
export class ARPExtService {
  ARP : ARPModel;
  rq : rqAuth = new rqAuth;
  private url='http://localhost:8010/BCSORTECODEModel';
  private url1='http://localhost:8011/ChequeReturnedModel';
  private url2='http://localhost:8012/DigitToStringModel';
  private url3='http://localhost:8013/SibDetailsModel';
  private url4='http://localhost:8014/SibCompDetailsModel';
  constructor(private  http: HttpClient ) 
  {
    this.rq.company="";
    this.rq.password="";
    this.rq.userName="";
    this.rq.columnName="";
    this.rq.criteriaValue="";
    this.rq.operand="";
    
    this.rq.columnName1="";
    this.rq.criteriaValue1="";
    this.rq.operand1="";
    this.rq.columnName2="";
    this.rq.criteriaValue2="";
    this.rq.operand2="";
  }
  ExtractChequeReturned(numerocheque): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'jwt-token'
      })
    };

    this.rq.company="********";// Private data 
    this.rq.password="*****";// Private data 
    this.rq.userName="CNPTWS";
    this.rq.columnName="@ID";
    this.rq.criteriaValue=numerocheque;
    this.rq.operand="EQ";
    return this.http.post(this.url1,this.rq) .pipe(map(user => {
      return user;
  
    }
    
    ));
    
  };
  Extractsdetails(numerocheque): Observable<any>
  { 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'jwt-token'
      })
    };

       this.rq.company="********";// Private data 
    this.rq.password="*****";// Private data
    this.rq.userName="CNPTWS";
    this.rq.columnName="NUMERO.CHEQUE";
    this.rq.criteriaValue=numerocheque;
    this.rq.operand="EQ";
    
    this.rq.columnName1="SENS";
    this.rq.criteriaValue1="1";
    this.rq.operand1="EQ";
    this.rq.columnName2="CODE.VALEUR";
    this.rq.criteriaValue2="82";
    this.rq.operand2="EQ";


    
    console.log(this.rq);
    return this.http.post(this.url3,this.rq) .pipe(map(user => {
      return user;
  
    }));
  };

  ExtractCompDetails(IdSdetails): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'jwt-token'
      })
    };

    this.rq.company="*****";// Private data 
    this.rq.password="****";// Private data 
    this.rq.userName="CNPTWS";
    this.rq.columnName="@ID";
    this.rq.criteriaValue=IdSdetails;
    this.rq.operand="EQ";
    return this.http.post(this.url4,this.rq) .pipe(map(user => {
      return user;
  
    }
    
    ));

    
    
  };




  ExtractBcsortcode(bc_id): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'jwt-token'
      })
    };

       this.rq.company="********";// Private data 
    this.rq.password="*****";// Private data
    this.rq.userName="CNPTWS";
    this.rq.columnName="@ID";
    this.rq.criteriaValue=bc_id;
    this.rq.operand="EQ";
    return this.http.post(this.url,this.rq) .pipe(map(user => {
      return user;
  
    }
    
    ));

  
}
ExtractDigitToString(mnt): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'jwt-token'
      })
    };

    this.rq.company="*****";// Private data 
    this.rq.password="*****";// Private data 
    this.rq.userName="CNPTWS";
    this.rq.columnName="DIGIT";
    this.rq.criteriaValue=mnt;
    this.rq.operand="EQ";
    return this.http.post(this.url2,this.rq) .pipe(map(user => {
      return user;
  
    }
    
    ));

  
}
}


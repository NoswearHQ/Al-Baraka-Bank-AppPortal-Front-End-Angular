import { Injectable } from '@angular/core';
import{ARPModel} from './model/ARPModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {rqAuth} from './model/rqAuth';
@Injectable({
  providedIn: 'root'
})
export class LDCService {
  ARP : ARPModel;
  rq : rqAuth = new rqAuth;
  private url='http://localhost:8085/WSBILLSModel';
  private url1='http://localhost:8048/WSPREVOUTModel';
  private url2='http://localhost:8049/WSREJETCPTCPTModel';
  constructor(private  http: HttpClient) 
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
      
    this.rq.columnName3="";
    this.rq.criteriaValue3="";
    this.rq.operand3="";
      
    this.rq.columnName4="";
    this.rq.criteriaValue4="";
    this.rq.operand4="";
  }
  ExtractWSBILLS(RIB,dataOP): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'jwt-token'
      })
    };
    this.rq.company="*******";// Private data 
    this.rq.password="*******";// Private data 
    this.rq.userName="CNPTWS";
    this.rq.columnName="RIB.CEDANT";
    this.rq.criteriaValue=RIB;
    this.rq.operand="EQ";
    
    this.rq.columnName1="DATE.OPERATION";
    this.rq.criteriaValue1=dataOP;
    this.rq.operand1="EQ";

    this.rq.columnName2="SENS";
    this.rq.criteriaValue2="2";
    this.rq.operand2="EQ";

    this.rq.columnName3="CODE.VALEUR";
    this.rq.criteriaValue3="41";
    this.rq.operand3="EQ";

    this.rq.columnName4="MOTIF.REJET";
    this.rq.criteriaValue4="";
    this.rq.operand4="NE";


    return this.http.post(this.url,this.rq) .pipe(map(user => {
      return user;
  
    }
    
    ));
    
  };
  ExtractREJETCPTCPT(RIB,dataOP): Observable<any>
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
    this.rq.columnName="COMPTE.CL.CR";
    this.rq.criteriaValue=RIB;
    this.rq.operand="EQ";
    
    this.rq.columnName1="MOTIF.REJET";
    this.rq.criteriaValue1="";
    this.rq.operand1="NE";

    this.rq.columnName2="DATE.ECHEANCE";
    this.rq.criteriaValue2=dataOP;
    this.rq.operand2="EQ";




    return this.http.post(this.url2,this.rq) .pipe(map(user => {
      return user;
  
    }
    
    ));
    
  };

  ExtractNom(numcontrat): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'jwt-token'
      })
    };
    
    
    this.rq.columnName1="";
    this.rq.criteriaValue1="";
    this.rq.operand1="";
      
    this.rq.columnName2="";
    this.rq.criteriaValue2="";
    this.rq.operand2="";
      
    this.rq.columnName3="";
    this.rq.criteriaValue3="";
    this.rq.operand3="";
      
    this.rq.columnName4="";
    this.rq.criteriaValue4="";
    this.rq.operand4="";

    this.rq.company="********";// Private data 
    this.rq.password="*****";// Private data
    this.rq.userName="CNPTWS";
    this.rq.columnName="REF.COMM.TIRE";
    this.rq.criteriaValue=numcontrat;
    this.rq.operand="EQ";
    return this.http.post(this.url2,this.rq) .pipe(map(user => {
      return user;
  
    }
    
    ));
    
  };

  ExtractPrevout(RIB,dataOP): Observable<any>
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
    this.rq.columnName="RIB.EMETTEUR";
    this.rq.criteriaValue=RIB;
    this.rq.operand="EQ";
    
    this.rq.columnName1="DATE.OPERATION";
    this.rq.criteriaValue1=dataOP;
    this.rq.operand1="EQ";

    this.rq.columnName2="CODE.VALEUR";
    this.rq.criteriaValue2="20";
    this.rq.operand2="EQ";

    this.rq.columnName3="CODE.ENREG";
    this.rq.criteriaValue3="22";
    this.rq.operand3="EQ";

    this.rq.columnName4="SENS";
    this.rq.criteriaValue4="2";
    this.rq.operand4="EQ";
    

    return this.http.post(this.url1,this.rq) .pipe(map(user => {
      return user;
  
    }
    
    ));
    
  };
}
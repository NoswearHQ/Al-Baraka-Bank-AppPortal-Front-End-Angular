import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {AuthModel} from './model/AuthModel';
import { Observable, BehaviorSubject } from 'rxjs';
//import { JsonPipe } from '@angular/common';
//import { Router } from '@angular/router';
//import { Login } from 'app/model/';
import {rqAuth} from './model/rqAuth';
import {User} from './model/user';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginT24Service {
  user:User;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  mod : AuthModel;
  rq : rqAuth = new rqAuth;
  private url='http://localhost:8080/LOGModel';
  constructor(private  http: HttpClient ) {
    
    
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }
   
   public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  login(user,pass): Observable<any> {
    const httpOptions = {
      
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'jwt-token'
      })
      
    };
   
    this.rq.company="********";// Private data 
    this.rq.password=pass;
    this.rq.userName=user;
    this.rq.columnName="SIGN.ON.NAME";
    this.rq.criteriaValue=user;
    this.rq.operand="EQ";

     /*const  params = new  HttpParams()
    .set('company' ,"")
    .set('password',"******")
    .set('userName',"NOSWEAR")
    .set('ColumnName',"SIGN_ON_NAME")
    .set('CriteriaValue',"NOSWEAR")
    .set('Operand',"EQ");*/
    //console.log(this.rq);
    return this.http.post(this.url,this.rq) .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next;
      return user;
  }));
};
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}
  }



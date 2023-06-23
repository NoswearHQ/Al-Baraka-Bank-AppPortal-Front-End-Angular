import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';  
import { LoginT24Service } from '../login-t24.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { AuthModel } from '../model/AuthModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
username:string;
password:string;
product:any
err:string;
errb:boolean=false;
i:Number;
//sellerForm: FormGroup;
//resAuth1: AuthModel = { selFldSIGNONNAME: '', agence: '',menu: '',app: '',codeagence: '',m: '',};

  constructor( private logint24 : LoginT24Service,
    private router: Router
  ) { }
  
//resAuth:AuthModel[];
data1;
  ngOnInit(): void {
  }

  LoginT24(): void{
  
   
    //let ii:number=0;


    /* this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
  }); */
 

  if (this.username!=="")   
  {
    if(this.password!=="" )
    {
    console.log("True");
 
    this.logint24.login(this.username,this.password).subscribe(
      data=>
      {
       
       //this.resAuth = data;
       this.data1=data;
  
       //console.log(1);
       this.data1=(JSON.stringify(data));
      
 var succes = this.data1.indexOf("SUCCESS");
 
   if (succes != -1) {
        //console.log(succes);
    // this.err="Welcome";
   //  console.log(this.err);
  //   this.router.navigate(['/menu']);
  this.router.navigate(['../menu']);
     
//console.log(this.router);
   }else{
     
     this.errb=true;
this.err="Veuillez tapez un mot de passe ."
setTimeout(() => {  
  location.reload();
}, 1500); 

   }
      });
    }else
    {
      console.log("True");
      this.err="Veuillez tapez un mot de passe ."
    }
  }else
  {
    console.log("True");
      this.err="Veuillez tapez un mot de passe ."
  }
     }

       


     








  }
    



/*
  Loginuser(){
    if (this.username =="t" && this.password=="t" )
   { console.log("Test");
    this.router.navigate(['/home']);
  }else{
    console.log("Fail");
  }
  }*/
/*
      
      if (!this.resAuth) {
        console.log("None");
      } else {
        console.log("Done");
      }*/


/*  console.log(this.resAuth);
        console.log(1);
      console.log(data);
      
      console.log(2);
      console.log(JSON.stringify({data}));*/
     
   

   /*
   var dataString =JSON.stringify(data);
   console.log(data);
   console.log(1);
   this.data1.forEach((item,index) => {
     var obj;
      console.log(1);
     obj={
       
     }
     console.log(1);
     this.data1.push(obj);
   });*/
 
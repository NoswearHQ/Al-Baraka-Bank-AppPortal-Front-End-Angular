import { Component, OnInit } from '@angular/core';
import {ARPExtService} from '../arp-ext.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import {KYCService} from '../kyc.service';

@Component({
  selector: 'app-annex11',
  templateUrl: './annex11.component.html',
  styleUrls: ['./annex11.component.scss']
})
export class Annex11Component implements OnInit {

  pageHeight:any;
  pageWidth :any;
  err1:boolean=false;
  err2:boolean=false;
  err3:boolean=false;
  numerocheque:string;
  IdSdetails:string="";
  IdSdetails1:string="";
  Ribtireur1:String="";
  bc_id_TR:String="";
  ribporteur1:string="";
  bc_id:string="";
  Code_Bnk:string="";
  montantcheque:string="";
  FEESHN:string="";
  CODE_AGN_T:string="";
  CODE_AGN_P:string="";
  Numero_CNP:string="";
  Agence_Titre:string="";
  Agence_Titre_1:string="";
  Poste_code:string="";
  Name:string="";
  show:boolean= false;
  showSpin:boolean= false;
  showAlert:boolean= false;
  nmbrenrgcmplt:number;
  tt:number=1;
i:number=0;
point:string=".";
newdate:string;
nom1:string;
nom2:string;
type1:string;
type2:string;
numidvisa1:string;
numidvisa2:string;
DATEARP:string="";
DATECNP:string="";
INTRETARD:string="";
MONTANTPROVISION:string="";
regex:any= /^(\d{4})(\d{2})(\d{2})$/;
teststring:string;
som1:number;
som2:number;
MNT_VERSE:number;
MONTANTCHEQUE_V:string;
MONTANTPROVISION_v:string;
teststring2:string;
MONTANTPROVISION_R:number;
MONTANTCHEQUE_R:number;
MNT_VERSE_String:string;
MillimeMTNcheque:string;
pos:number;
lenght:number;
selected:string="";
DATECNP_RTND:string="";
REGULARISATNDATE:string="";
err:string="";
show2:boolean= false;  
DATERETURN:string=""
tab=[];
  Names=[];
  Names1=[];
  data1;
  data2;
  ACCOUNTHN:string="";
  idcount:string="";
  idcount1:string="";
  nomHN:string;
  prenomHN:string;
  dateanr:string;
  NUMPROT:string;
  dateprot:string;
  NEXTREVIEWDATE:string;
  REJECTED:string;
  myDate:Date;
  nomprenom:string;
  LETTRE:string;
  PENALTY:string;
  L_INTRETARD:string;
  L_INTRETARD_String:string;
  MillimeL_INTRETARD:string;
  DATEDLVRCHEQUE:string;
  L_FEESHN:string;
 FEESHN_INTRETARD:string;
 L_FEESHN_String:string;
 L_PENALTY:string;
 L_PENALTY_String:string;
 L_PENALTYMill:string;
 Electronique:boolean=false;
 datelettre:string;
 beneficiary:string;
  constructor(private arpext : ARPExtService,  private router: Router,private arpext1 : KYCService) { }

  ngOnInit(): void {
    this.show2=true;
  }
  ExtraireElectronique():void
  {
    this.Electronique=true;
    console.log(this.Electronique)
    this.showSpin=true;
    this.arpext.ExtractChequeReturned(this.numerocheque).subscribe(
      dataCHQ=>
          {
          
          this.data1=dataCHQ;
      
          this.data1=(JSON.stringify(dataCHQ));
          var succes = this.data1.indexOf("SUCCESS");
          var notfound = this.data1.indexOf("No records");
          if (succes != -1 && notfound  == -1) {
             this.FEESHN=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].feeshn;
          //  this.beneficiary=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].beneficiary;
       
            
            
            
             this.pos=Number (this.FEESHN.indexOf("."));
             this.lenght=Number (this.FEESHN.length);
             this.L_FEESHN=this.FEESHN.substr(0,this.pos);
            
             this.dateanr=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].dateanr;
//this.BENEFICIARY=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].beneficiary;
this.LETTRE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].inpreturndate;
this.PENALTY=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].penalty;
             this.DATEARP=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].datearp;
             console.log(this.DATEARP)
             this.INTRETARD=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].intretard;
        
            

             this.pos=Number (this.INTRETARD.indexOf("."));
             this.lenght=Number (this.INTRETARD.length);
             this.L_INTRETARD=this.INTRETARD.substr(0,this.pos);

             this.pos=Number (this.PENALTY.indexOf("."));
             this.lenght=Number (this.PENALTY.length);
             this.L_PENALTY=this.PENALTY.substr(0,this.pos);
           
             this.DATECNP_RTND=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].rejectiondate;
             this.REGULARISATNDATE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].regularisatndate;
             this.DATERETURN=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].returndate;
             this.idcount=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].accounthn;
             this.idcount1=this.idcount.substr(0,1);
             this.idcount=this.idcount.substr(10,6);
             this.NUMPROT=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].numberprotet;
             this.dateprot=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].dateprotet;
             this.NEXTREVIEWDATE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].nextreviewdate;
             this.REJECTED=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].rejected;
            

             if (this.idcount1 == "0") {
               this.idcount=this.idcount.substr(1,5);
               this.ACCOUNTHN=this.idcount;
             }
          
               
           
             
           
           /*  if (this.INTRETARD != "") {
              this.INTRETARD= this.INTRETARD.concat(' DT');
             }
*/
             this.NEXTREVIEWDATE = this.NEXTREVIEWDATE.replace(this.regex, "$3.$2.$1")
             this.NEXTREVIEWDATE= this.NEXTREVIEWDATE.replace('.','/')
             this.NEXTREVIEWDATE= this.NEXTREVIEWDATE.replace('.','/')

             this.DATEARP = this.DATEARP.replace(this.regex, "$3.$2.$1")
             this.DATEARP= this.DATEARP.replace('.','/')
             this.DATEARP= this.DATEARP.replace('.','/')

          /*   this.datelettre = this.datelettre.replace(this.regex, "$3.$2.$1")
             this.datelettre= this.datelettre.replace('.','/')
             this.datelettre= this.datelettre.replace('.','/')*/
            
             this.DATERETURN = this.DATERETURN.replace(this.regex, "$3.$2.$1")
             this.DATERETURN= this.DATERETURN.replace('.','/')
             this.DATERETURN= this.DATERETURN.replace('.','/')

             this.DATECNP_RTND = this.DATECNP_RTND.replace(this.regex, "$3.$2.$1")
             this.DATECNP_RTND= this.DATECNP_RTND.replace('.','/')
             this.DATECNP_RTND= this.DATECNP_RTND.replace('.','/')

             this.dateanr = this.dateanr.replace(this.regex, "$3.$2.$1")
             this.dateanr= this.dateanr.replace('.','/')
             this.dateanr= this.dateanr.replace('.','/')

             this.dateprot = this.dateprot.replace(this.regex, "$3.$2.$1")
             this.dateprot= this.dateprot.replace('.','/')
             this.dateprot= this.dateprot.replace('.','/')

             if(this.DATECNP_RTND =="")
             {
              this.showSpin=false;
        
              this.err=" ARP n'est pas encore etabli";
              this.showAlert=true;
              this.show2=!this.show2;
              setTimeout(() => {  
              location.reload();
            }, 3000); 
          }

             
          if (this.datelettre !="") 
              {    
                this.showSpin=false;

                this.err="  DATEARP ET DATELETTRE les deux sont disponible verifier votre saisie T24";
                this.showAlert=true;
                this.show2=!this.show2;
                setTimeout(() => {  
                  location.reload();
                }, 2000); 
            }
              
          if (this.REGULARISATNDATE !="") 
           
{
this.showSpin=false;
this.err="Ce cheque a ete regularisé";
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 
}

if(this.DATEARP == "")      
{
this.showSpin=false;
this.err="DATE.ARP Non disponible";
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 
}

if (this.INTRETARD =="")        
{

  this.showSpin=false;
this.err="Intérêts de retard non disponible";
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 

}

if (this.PENALTY =="")        
{

  this.showSpin=false;
this.err="Amende Non disponible";
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 

}
        }/*if (notfound  != -1)*/
        else {
          this.showSpin=false;

this.err="Verifier le numero de cheque  "+this.numerocheque;
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 
        }

        });



        
    /* *************************sdetails**************************** */
    this.arpext.Extractsdetails(this.numerocheque).subscribe(
      datasde=>
          {
           this.data1=datasde;
           this.data1=(JSON.stringify(datasde));
           var succes = this.data1.indexOf("SUCCESS");     
           if (succes != -1) {     
               this.IdSdetails=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].id;
               this.Ribtireur1=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribtireur;
               this.ribporteur1=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribporteur;
               this.Code_Bnk=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribporteur;
               this.DATECNP=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].datecnp;
               this.DATECNP = this.DATECNP.replace(this.regex, "$3.$2.$1")
               this.DATECNP= this.DATECNP.replace('.','/')
               this.DATECNP= this.DATECNP.replace('.','/')
               this.bc_id_TR=this.Ribtireur1.substr(0,5);
               this.bc_id=this.ribporteur1.substr(0,5);
               this.Code_Bnk=this.ribporteur1.substr(0,2);
               this.CODE_AGN_T=this.Ribtireur1.substr(2,3);
               this.CODE_AGN_P=this.ribporteur1.substr(2,3);
               this.Numero_CNP=this.numerocheque.substr(3,4);
               this.montantcheque=this.montantcheque.concat(" DT");
               this.nmbrenrgcmplt=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].nmbrenrgcmplt;
               this.MONTANTPROVISION=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].montantprovision;
               this.montantcheque=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].montantcheque;
               this.DATEDLVRCHEQUE=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].datedlvrcheque;
           this.som1= Number(this.montantcheque);
           this.teststring= this.som1.toFixed();
           this.MONTANTCHEQUE_R= Number(this.teststring);
               if(this.MONTANTPROVISION != "")
               {
                this.som2=Number(this.MONTANTPROVISION)
                this.teststring2= this.som2.toFixed();
                this.MONTANTPROVISION_R= Number(this.teststring2);
               }
               else
               {
              this.MONTANTPROVISION_R=0;
               }
               this.MNT_VERSE=this.MONTANTCHEQUE_R-this.MONTANTPROVISION_R;  
               
         }
        });
        setTimeout(() => { 
       while (this.nmbrenrgcmplt >= 1) { 
         
        this.IdSdetails1=this.IdSdetails;
this.IdSdetails1=this.IdSdetails1.concat(".");
this.IdSdetails1=this.IdSdetails1.concat(this.nmbrenrgcmplt.toString());
         this.arpext.ExtractCompDetails(this.IdSdetails1).subscribe(
          dataComp=>
              {
              this.data1=dataComp;
              this.data1=(JSON.stringify(dataComp));

             
                this.nom2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].nomprenom;
                this.type2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].type;
                this.numidvisa2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].numidvisa;
                
               
               
               
                this.Names.push(
                  {
                    type: this.type2.toString(),
                    name :this.nom2.toString(),
                    numidvisa:this.numidvisa2.toString()
                  }
                )

            }
            );
       this.nmbrenrgcmplt--;
     } 
   

    }, 12000);
    
        

    setTimeout(() => { 
    this.arpext.ExtractBcsortcode(this.bc_id).subscribe(
      dataBanque=>
          {    
            var succes = this.data1.indexOf("SUCCESS");     
            if (succes != -1) {     
          this.data1=dataBanque;
          this.data1=(JSON.stringify(dataBanque));
          this.Agence_Titre=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name;  
          this.Poste_code=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].postcode; 
          this.Name=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name; 
        }}
        );

}, 10000);


setTimeout(() => { 
this.arpext.ExtractBcsortcode(this.bc_id_TR).subscribe(
  dataBanque=>
      {
        var succes = this.data1.indexOf("SUCCESS");     
        if (succes != -1) { 
      this.data1=dataBanque;
      this.data1=(JSON.stringify(dataBanque));
      this.Agence_Titre_1=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name;    
    }}
    );
}, 10000);
setTimeout(() => { 
this.arpext.ExtractDigitToString(this.MNT_VERSE).subscribe(
  datadigit=>
      {
      this.data1=datadigit;
      this.data1=(JSON.stringify(datadigit));
      var succes = this.data1.indexOf("SUCCESS");
      if (succes != -1) {
        this.MNT_VERSE_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
        this.pos=Number (this.montantcheque.indexOf("."));
        this.pos++;
        this.lenght=Number (this.montantcheque.length);
        this.MillimeMTNcheque=this.montantcheque.substr(this.pos,this.lenght);
        this.MNT_VERSE_String=this.MNT_VERSE_String.concat(" ",this.MillimeMTNcheque," Millimes (",this.montantcheque," DT).");
        this.MNT_VERSE_String=this.MNT_VERSE_String.replace("SEULEMENT","DINARS");

     
    }
    });
  }, 10000);

  setTimeout(() => { 
    this.arpext.ExtractDigitToString(this.L_INTRETARD).subscribe(
      datadigit=>
          {
          this.data1=datadigit;
          this.data1=(JSON.stringify(datadigit));
          var succes = this.data1.indexOf("SUCCESS");
          if (succes != -1) {
            this.L_INTRETARD_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
            this.pos=Number (this.INTRETARD.indexOf("."));
            this.pos++;
            this.lenght=Number (this.INTRETARD.length);
            this.MillimeL_INTRETARD=this.INTRETARD.substr(this.pos,this.lenght);
            this.L_INTRETARD_String=this.L_INTRETARD_String.concat(" ",this.MillimeL_INTRETARD," Millimes (",this.INTRETARD," DT).");
            this.L_INTRETARD_String=this.L_INTRETARD_String.replace("SEULEMENT","DINARS");
         
        }
        });
      }, 10000);

      setTimeout(() => { 
        this.arpext1.ExtractCustomer(this.ACCOUNTHN).subscribe(
          dataCus=>
              {
                var succes = this.data1.indexOf("SUCCESS");     
                if (succes != -1) { 
              this.data1=dataCus;
              console.log(dataCus);
              this.data1=(JSON.stringify(dataCus));
              this.nomHN=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].nom;
              this.prenomHN=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].prenom;
      
            }}
            );
        }, 10000);


      setTimeout(() => { 
        this.arpext.ExtractDigitToString(this.L_FEESHN).subscribe(
          datadigit=>
              {
              this.data1=datadigit;
              this.data1=(JSON.stringify(datadigit));
              var succes = this.data1.indexOf("SUCCESS");
              if (succes != -1) {
                this.L_FEESHN_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
                this.pos=Number (this.FEESHN.indexOf("."));
                this.pos++;
                this.lenght=Number (this.FEESHN.length);
                this.FEESHN_INTRETARD=this.FEESHN.substr(this.pos,this.lenght);
                
                this.L_FEESHN_String= this.L_FEESHN_String.concat(" ",this.FEESHN_INTRETARD," Millimes (",this.FEESHN," DT).");
                this.L_FEESHN_String=this.L_FEESHN_String.replace("SEULEMENT","DINARS");
             
            }
            });
          }, 10000);

          setTimeout(() => { 
            this.arpext.ExtractDigitToString(this.L_PENALTY).subscribe(
              datadigit=>
                  {
                  this.data1=datadigit;
                  this.data1=(JSON.stringify(datadigit));
                  var succes = this.data1.indexOf("SUCCESS");
                  if (succes != -1) {
                    this.L_PENALTY_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
                    this.pos=Number (this.PENALTY.indexOf("."));
                    this.pos++;
                    this.lenght=Number (this.PENALTY.length);
                    this.L_PENALTYMill=this.PENALTY.substr(this.pos,this.lenght);
                    
                    this.L_PENALTY_String= this.L_PENALTY_String.concat(" ",this.L_PENALTYMill," Millimes (",this.PENALTY," DT).");
                    this.L_PENALTY_String=this.L_PENALTY_String.replace("SEULEMENT","DINARS");
                    console.log(this.L_PENALTY_String );
                 
                }
                });
              }, 10000);
setTimeout(() => {   
  this.tab.push(
  {
    champ:"N° Du Chèque",
    name: this.numerocheque.toString()
  },
  
  {
    champ:"Montant du Chèque",
    name: this.montantcheque.toString()
  },
  
{
  champ:"Banque tiré",
  name:"ALBARAKA BANK TUNISIA"
},
  {
    champ:"Agence tiré",
    name: this.Agence_Titre_1.toString()
  },
  {
    champ:"Banque présentatrice",
    name: this.Poste_code.toString()
  },
  {
    champ:"Agence présentatrice",
    name: this.Name.toString()
  },

  )
  this.showSpin=false;
  this.show=!this.show;
  this.show2=!this.show2;
}, 13000);   



}
selectChangeHandler(event: any)
  {

   this.selected = event.target.value;
 

  

  }
  back():void
  {
    this.router.navigate(['CHEQUERETURNED']);
  }

  ExtraireLettre():void
  {
    
    
    this.showSpin=true;
    this.arpext.ExtractChequeReturned(this.numerocheque).subscribe(
      dataCHQ=>
          {
          
          this.data1=dataCHQ;
      
          this.data1=(JSON.stringify(dataCHQ));
          var succes = this.data1.indexOf("SUCCESS");
          var notfound = this.data1.indexOf("No records");
          if (succes != -1 && notfound  == -1) {
             this.FEESHN=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].feeshn;
       
       
            
            
            
             this.pos=Number (this.FEESHN.indexOf("."));
             this.lenght=Number (this.FEESHN.length);
             this.L_FEESHN=this.FEESHN.substr(0,this.pos);
            
             this.dateanr=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].dateanr;
             this.beneficiary=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].beneficiary;
             console.log(this.beneficiary)
             this.LETTRE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].inpreturndate;
             this.PENALTY=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].penalty;
             this.DATEARP=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].datearp;
             this.INTRETARD=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].intretard;
             this.datelettre=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].inpreturndate;

            

             this.pos=Number (this.INTRETARD.indexOf("."));
             this.lenght=Number (this.INTRETARD.length);
             this.L_INTRETARD=this.INTRETARD.substr(0,this.pos);

             this.pos=Number (this.PENALTY.indexOf("."));
             this.lenght=Number (this.PENALTY.length);
             this.L_PENALTY=this.PENALTY.substr(0,this.pos);
           
             this.DATECNP_RTND=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].rejectiondate;
             this.REGULARISATNDATE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].regularisatndate;
             this.DATERETURN=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].returndate;
             this.idcount=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].accounthn;
             this.idcount1=this.idcount.substr(0,1);
             this.idcount=this.idcount.substr(10,6);
             this.NUMPROT=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].numberprotet;
             this.dateprot=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].dateprotet;
             this.NEXTREVIEWDATE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].nextreviewdate;
             this.REJECTED=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].rejected;
            

             if (this.idcount1 == "0") {
               this.idcount=this.idcount.substr(1,5);
               this.ACCOUNTHN=this.idcount;
               console.log(this.ACCOUNTHN);
             }
          
             console.log(this.ACCOUNTHN);
           
             
           
           /*  if (this.INTRETARD != "") {
              this.INTRETARD= this.INTRETARD.concat(' DT');
             }
*/
             this.NEXTREVIEWDATE = this.NEXTREVIEWDATE.replace(this.regex, "$3.$2.$1")
             this.NEXTREVIEWDATE= this.NEXTREVIEWDATE.replace('.','/')
             this.NEXTREVIEWDATE= this.NEXTREVIEWDATE.replace('.','/')

             this.DATEARP = this.DATEARP.replace(this.regex, "$3.$2.$1")
             this.DATEARP= this.DATEARP.replace('.','/')
             this.DATEARP= this.DATEARP.replace('.','/')
            
             this.datelettre = this.datelettre.replace(this.regex, "$3.$2.$1")
             this.datelettre= this.datelettre.replace('.','/')
             this.datelettre= this.datelettre.replace('.','/')

             this.DATERETURN = this.DATERETURN.replace(this.regex, "$3.$2.$1")
             this.DATERETURN= this.DATERETURN.replace('.','/')
             this.DATERETURN= this.DATERETURN.replace('.','/')

             this.DATECNP_RTND = this.DATECNP_RTND.replace(this.regex, "$3.$2.$1")
             this.DATECNP_RTND= this.DATECNP_RTND.replace('.','/')
             this.DATECNP_RTND= this.DATECNP_RTND.replace('.','/')

             this.dateanr = this.dateanr.replace(this.regex, "$3.$2.$1")
             this.dateanr= this.dateanr.replace('.','/')
             this.dateanr= this.dateanr.replace('.','/')

             this.dateprot = this.dateprot.replace(this.regex, "$3.$2.$1")
             this.dateprot= this.dateprot.replace('.','/')
             this.dateprot= this.dateprot.replace('.','/')

             
             if(this.DATECNP_RTND =="")
             {
              this.showSpin=false;
        
              this.err="ARP n'est pas encore etabli";
              this.showAlert=true;
              this.show2=!this.show2;
              setTimeout(() => {  
              location.reload();
            }, 3000); 
          }

             
          if (this.datelettre =="") 
        
              {    
                this.showSpin=false;

                this.err=" Lettre Non disponible";
                this.showAlert=true;
                this.show2=!this.show2;
                setTimeout(() => {  
                  location.reload();
                }, 2000); 
            }
              
          if (this.REGULARISATNDATE !="") 
           
{
this.showSpin=false;
this.err="Ce cheque a ete regularisé";
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 
}
if (this.DATEARP!="")        
{

  this.showSpin=false;
this.err="DATEARP ET DATELETTRE les deux sont disponible verifier votre saisie T24";
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 

}

if (this.PENALTY=="")        
{

  this.showSpin=false;
this.err="Amende Non disponible";
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 

}
        }/*if (notfound  != -1)*/
        else {
          this.showSpin=false;

this.err="Verifier le numero de cheque  "+this.numerocheque;
this.showAlert=true;
this.show2=!this.show2;
setTimeout(() => {  
  location.reload();
}, 2000); 
        }

        });



        
    /* *************************sdetails**************************** */
    this.arpext.Extractsdetails(this.numerocheque).subscribe(
      datasde=>
          {
           this.data1=datasde;
           this.data1=(JSON.stringify(datasde));
           var succes = this.data1.indexOf("SUCCESS");     
           if (succes != -1) {     
               this.IdSdetails=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].id;
               this.Ribtireur1=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribtireur;
               this.ribporteur1=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribporteur;
               this.Code_Bnk=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribporteur;
               this.DATECNP=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].datecnp;
               this.DATECNP = this.DATECNP.replace(this.regex, "$3.$2.$1")
               this.DATECNP= this.DATECNP.replace('.','/')
               this.DATECNP= this.DATECNP.replace('.','/')
               this.bc_id_TR=this.Ribtireur1.substr(0,5);
               this.bc_id=this.ribporteur1.substr(0,5);
               this.Code_Bnk=this.ribporteur1.substr(0,2);
               this.CODE_AGN_T=this.Ribtireur1.substr(2,3);
               this.CODE_AGN_P=this.ribporteur1.substr(2,3);
               this.Numero_CNP=this.numerocheque.substr(3,4);
               this.montantcheque=this.montantcheque.concat(" DT");
               this.nmbrenrgcmplt=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].nmbrenrgcmplt;
               this.MONTANTPROVISION=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].montantprovision;
               this.montantcheque=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].montantcheque;
               this.DATEDLVRCHEQUE=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].datedlvrcheque;
           this.som1= Number(this.montantcheque);
           this.teststring= this.som1.toFixed();
           this.MONTANTCHEQUE_R= Number(this.teststring);
               if(this.MONTANTPROVISION != "")
               {
                this.som2=Number(this.MONTANTPROVISION)
                this.teststring2= this.som2.toFixed();
                this.MONTANTPROVISION_R= Number(this.teststring2);
               }
               else
               {
              this.MONTANTPROVISION_R=0;
               }
               this.MNT_VERSE=this.MONTANTCHEQUE_R-this.MONTANTPROVISION_R;  
               
         }
        });
        setTimeout(() => { 
       while (this.nmbrenrgcmplt >= 1) { 
         
        this.IdSdetails1=this.IdSdetails;
this.IdSdetails1=this.IdSdetails1.concat(".");
this.IdSdetails1=this.IdSdetails1.concat(this.nmbrenrgcmplt.toString());
         this.arpext.ExtractCompDetails(this.IdSdetails1).subscribe(
          dataComp=>
              {
              this.data1=dataComp;
              this.data1=(JSON.stringify(dataComp));

             
                this.nom2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].nomprenom;
                this.type2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].type;
                this.numidvisa2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].numidvisa;
                
               
               
               
                this.Names.push(
                  {
                    type: this.type2.toString(),
                    name :this.nom2.toString(),
                    numidvisa:this.numidvisa2.toString()
                  }
                )

            }
            );
       this.nmbrenrgcmplt--;
     } 
   

    }, 12000);
    
        

    setTimeout(() => { 
    this.arpext.ExtractBcsortcode(this.bc_id).subscribe(
      dataBanque=>
          {    
            var succes = this.data1.indexOf("SUCCESS");     
            if (succes != -1) {     
          this.data1=dataBanque;
          this.data1=(JSON.stringify(dataBanque));
          this.Agence_Titre=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name;  
          this.Poste_code=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].postcode; 
          this.Name=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name; 
        }}
        );

}, 10000);


setTimeout(() => { 
this.arpext.ExtractBcsortcode(this.bc_id_TR).subscribe(
  dataBanque=>
      {
        var succes = this.data1.indexOf("SUCCESS");     
        if (succes != -1) { 
      this.data1=dataBanque;
      this.data1=(JSON.stringify(dataBanque));
      this.Agence_Titre_1=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name;    
    }}
    );
}, 10000);
setTimeout(() => { 
this.arpext.ExtractDigitToString(this.MNT_VERSE).subscribe(
  datadigit=>
      {
      this.data1=datadigit;
      this.data1=(JSON.stringify(datadigit));
      var succes = this.data1.indexOf("SUCCESS");
      if (succes != -1) {
        this.MNT_VERSE_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
        this.pos=Number (this.montantcheque.indexOf("."));
        this.pos++;
        this.lenght=Number (this.montantcheque.length);
        this.MillimeMTNcheque=this.montantcheque.substr(this.pos,this.lenght);
        this.MNT_VERSE_String=this.MNT_VERSE_String.concat(" ",this.MillimeMTNcheque," Millimes (",this.montantcheque," DT).");
        this.MNT_VERSE_String=this.MNT_VERSE_String.replace("SEULEMENT","DINARS");

     
    }
    });
  }, 10000);

  setTimeout(() => { 
    this.arpext.ExtractDigitToString(this.L_INTRETARD).subscribe(
      datadigit=>
          {
          this.data1=datadigit;
          this.data1=(JSON.stringify(datadigit));
          var succes = this.data1.indexOf("SUCCESS");
          if (succes != -1) {
            this.L_INTRETARD_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
            this.pos=Number (this.INTRETARD.indexOf("."));
            this.pos++;
            this.lenght=Number (this.INTRETARD.length);
            this.MillimeL_INTRETARD=this.INTRETARD.substr(this.pos,this.lenght);
            this.L_INTRETARD_String=this.L_INTRETARD_String.concat(" ",this.MillimeL_INTRETARD," Millimes (",this.INTRETARD," DT).");
            this.L_INTRETARD_String=this.L_INTRETARD_String.replace("SEULEMENT","DINARS");
         
        }
        });
      }, 10000);

      setTimeout(() => { 
        this.arpext1.ExtractCustomer(this.ACCOUNTHN).subscribe(
          dataCus=>
              {
                var succes = this.data1.indexOf("SUCCESS");     
                if (succes != -1) { 
              this.data1=dataCus;
              console.log(dataCus);
              this.data1=(JSON.stringify(dataCus));
      this.nomHN=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].nom;
      this.prenomHN=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].prenom;
            }}
            );
        }, 10000);


      setTimeout(() => { 
        this.arpext.ExtractDigitToString(this.L_FEESHN).subscribe(
          datadigit=>
              {
              this.data1=datadigit;
              this.data1=(JSON.stringify(datadigit));
              var succes = this.data1.indexOf("SUCCESS");
              if (succes != -1) {
                this.L_FEESHN_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
                this.pos=Number (this.FEESHN.indexOf("."));
                this.pos++;
                this.lenght=Number (this.FEESHN.length);
                this.FEESHN_INTRETARD=this.FEESHN.substr(this.pos,this.lenght);
                
                this.L_FEESHN_String= this.L_FEESHN_String.concat(" ",this.FEESHN_INTRETARD," Millimes (",this.FEESHN," DT).");
                this.L_FEESHN_String=this.L_FEESHN_String.replace("SEULEMENT","DINARS");
             
            }
            });
          }, 10000);

          setTimeout(() => { 
            this.arpext.ExtractDigitToString(this.L_PENALTY).subscribe(
              datadigit=>
                  {
                  this.data1=datadigit;
                  this.data1=(JSON.stringify(datadigit));
                  var succes = this.data1.indexOf("SUCCESS");
                  if (succes != -1) {
                    this.L_PENALTY_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
                    this.pos=Number (this.PENALTY.indexOf("."));
                    this.pos++;
                    this.lenght=Number (this.PENALTY.length);
                    this.L_PENALTYMill=this.PENALTY.substr(this.pos,this.lenght);
                    
                    this.L_PENALTY_String= this.L_PENALTY_String.concat(" ",this.L_PENALTYMill," Millimes (",this.PENALTY," DT).");
                    this.L_PENALTY_String=this.L_PENALTY_String.replace("SEULEMENT","DINARS");
                    console.log(this.L_PENALTY_String );
                 
                }
                });
              }, 10000);
setTimeout(() => {   
  this.tab.push(
  {
    champ:"N° Du Chèque",
    name: this.numerocheque.toString()
  },
  
  {
    champ:"Montant du Chèque",
    name: this.montantcheque.toString()
  },
  
{
  champ:"Banque tiré",
  name:"ALBARAKA BANK TUNISIA"
},
  {
    champ:"Agence tiré",
    name: this.Agence_Titre_1.toString()
  },
  {
    champ:"Banque présentatrice",
    name: this.Poste_code.toString()
  },
  {
    champ:"Agence présentatrice",
    name: this.Name.toString()
  },

  )
  this.showSpin=false;
  this.show=!this.show;
  this.show2=!this.show2;
}, 13000);   



}
  Clear():void
{
      location.reload();
}

  Print():void
  {      console.log(this.Electronique)


    if (this.Electronique==true) 
    {
      console.log(this.Electronique)
    
    const doc = new jsPDF();

    this.pageWidth =doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    this.pageHeight =doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.setFontSize(9);
    doc.text("AL BARAKA BANK TUNISIA ",  25, 20 , 'center');  

    doc.setFontSize(14);
    doc.text("ANNEXE N°11 A LA CIRCULAIRE AUX",  this.pageWidth / 2, 38 , 'center');
    doc.text("ETABLISSEMENTS DE CREDIT N°2007-18 DU 05 JUILLET 2017",  this.pageWidth / 2, 44 , 'center');
    doc.text("ATTESTATION DE REGULARISATION",  this.pageWidth / 2, 50 , 'center');
    doc.text("CONFORMEMENT A L’ARTICLE 412 TER ",  this.pageWidth / 2, 56 , 'center');



    doc.setFontSize(10);    
    doc.text("Banque tiré",  42, 80 , 'center');
   doc.text("Agence tiré",  120, 80 , 'center');
   doc.text("Banque présentatrice",  50, 86 , 'center');
    doc.text("Agence présentatrice",  50, 92 , 'center');
    doc.text("ALBARAKA BANK TUNISIA",  80, 80 , 'center');
    doc.text(this.Agence_Titre_1,  160, 80 , 'center');
    doc.text(this.Poste_code,  96, 86 , 'center');
    doc.text(this.Name,  101, 92 , 'center');



  doc.text("Nous soussignés,AL BARAKA BANK TUNISIA,..........",  77, 130 , 'center');
  doc.text("Attestion que Mr.",  130, 130 , 'center');
  doc.text(this.selected,  70, 136 , 'center');
  for (let i = 0; i < 2; i++) {
    var num = this.Names[i].name;
if (num == this.selected)
{
  doc.text(this.Names[i].type,  160, 136 );
     doc.text(this.Names[i].numidvisa,  175, 136 );
}}

  doc.text("titulaire de la piéce d'identité",  135, 136 , 'center');
  doc.text(" a régularisé  l’incident de paiement relatif au chèque n°  ",  10, 142  );
  doc.text(this.numerocheque,  110, 142  );   
  doc.text("Objet du ",  170, 142  ); 
  doc.text("certificat de non-paiement n° ",10,148);    doc.text(this.Numero_CNP,  65, 148  );  doc.text(this.DATECNP,  120, 148  );
  doc.text("du ",  100, 148  );
  doc.text("et ce par (****) : ",  10, 154  );
  doc.text("1- Le paiement du montant du chèque* ou (*****) l’insuffisance de la provision et ",  10, 160 );
  doc.text("l’intérêt de retard revenant au bénéficiaire par :",  10, 166  );
  doc.text("!*!  Le versement par bordereau de versement du ",  30, 172  );
  doc.text(this.DATEARP,  120, 172  );
  doc.text("la somme de ",  170, 172  );
  doc.text(this.MNT_VERSE_String,  20, 178  );
  doc.text("au titre",  170, 178  );
  //
  doc.text("de reconstitution de la provision du chèque susvisé ainsi que la somme de",  10, 184  );
  doc.text(this.L_INTRETARD_String,  20, 190  );
  doc.text("au titre de l’intérêt de retard revenant au porteur ",  115, 190  );
  doc.text("pour la période allant du (**) ",  10, 196  );doc.text(this.DATECNP_RTND,  70, 196  );
  //
  doc.text("au (***) ",  110, 196  );doc.text(this.DATEARP,  130, 196  );
  
  doc.text("         !_! La production en date du………………d ‘une quittance délivrée par la Trésorerie Générale de",  20, 202  );
  doc.text("Tunisie    en    date    du…………….     sous n°…………..                        relatif à la consignation du montant",  10, 208  );
  doc.text("de………………………………………………….D.T au titre de reconstitution de la provision du chèque susvisé",  10, 214  );
  doc.text("ainsi que l’intérêt de retard revenant au porteur pour la période allant du (**)…………………………………….au",  10, 220  );
  doc.text("(***)………….",  10, 226  );
  doc.text("!-!  La production en date du ",  30, 232  );
  //
  doc.text("de l’original du chèque susvisé et d’un acte écrit avec",  100, 232  );
  doc.text("signature légalisée du bénéficiaire  ",  10, 238  ); 
  //
  doc.text("datant du…………….. comportant  ",  120, 238  );
  doc.text("la reconnaissance du dit bénéficiaire d’avoir reçu du tireur du chèque un montant de   ",  10, 244  );
  //
  doc.text("au titre de la provision du chèque",  140, 250  );

  doc.setFontSize(9);

  doc.text("(*)Mettre «C» pour la carte d’identité Nationale,",15,260);
  doc.text("«S» pour la carte de séjour pour les étrangers résidents.",25,264);
  doc.text("«P» pour le passeport pour les étrangers non-résidents.",25,268);
  doc.text("(**)Cette date doit correspondre à celle du C.N.P",15,272);


  doc.text("(***)Cette date doit correspondre à la date de reconstitution de la provision",15,276);
  doc.text("(****) Le spécimen de la signature de l’agent doit être déposé auprès de la Banque Centrale.",15,280);
  
  doc.setFontSize(10);

  doc.addPage();
  doc.text("2- ! X! Le versement d’un montant de  ",15,20);doc.text(this.L_FEESHN_String,80,20);
  doc.text("en date du ",15,30); doc.text(this.DATEARP,35,30);
  //
  doc.text("au titre de recouvrement des frais de signification de l’avis de ",70,30);
  doc.text("non paiement du chèque susvisé, notifié par Maître",15,36);doc.text(this.nomHN,100,36); doc.text(this.prenomHN,140,36);
  //
  doc.text("huissier notaire en date du ",15,42);doc.text(this.dateprot,60,42);
  doc.text("3- Le paiement de l’amende au profit du Trésor par :",15,52);
  doc.text(" !  X ! Le versement de la somme de ",15,60);doc.text(this.L_PENALTY_String,80,60);
  doc.text(" en date du ",15,68);doc.text(this.DATEARP,40,68);
  doc.text(" au profit du Trésor au titre de paiement de l’amende prévue  ",70,68);
  doc.text("  par l’article 412 ter  du Code de Commerce due au titre du chèque susvisé.",15,74);

  doc.text("!_!  La production en date du…………………… d’une quittance délivrée par la Trésorerie Générale",15,84);
  doc.text("de Tunisie en date du…. Sous n°…. prouvant le paiement de l’amende prévue par l’article 412 ter du",15,90);
  doc.text("Code de Commerce due au titre du chèque susvisé.",15,96);
  doc.text("Cette attestation est délivrée à l’intéressé (e) pour servir et valoir ce que de droit.",15,110);
window.open(doc.output('bloburl'), '_blank');
  }else
  {
    console.log(this.Electronique)
    const doc = new jsPDF();

    this.pageWidth =doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    this.pageHeight =doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.setFontSize(9);
    doc.text("AL BARAKA BANK TUNISIA ",  25, 20 , 'center');  

    doc.setFontSize(14);
    doc.text("ANNEXE N°11 A LA CIRCULAIRE AUX",  this.pageWidth / 2, 38 , 'center');
    doc.text("ETABLISSEMENTS DE CREDIT N°2007-18 DU 05 JUILLET 2017",  this.pageWidth / 2, 44 , 'center');
    doc.text("ATTESTATION DE REGULARISATION",  this.pageWidth / 2, 50 , 'center');
    doc.text("CONFORMEMENT A L’ARTICLE 412 TER ",  this.pageWidth / 2, 56 , 'center');



    doc.setFontSize(10);    
    doc.text("Banque tiré",  42, 80 , 'center');
   doc.text("Agence tiré",  120, 80 , 'center');
   doc.text("Banque présentatrice",  50, 86 , 'center');
    doc.text("Agence présentatrice",  50, 92 , 'center');
    doc.text("ALBARAKA BANK TUNISIA",  80, 80 , 'center');
    doc.text(this.Agence_Titre_1,  160, 80 , 'center');
    doc.text(this.Poste_code,  96, 86 , 'center');
    doc.text(this.Name,  101, 92 , 'center');



  doc.text("Nous soussignés,AL BARAKA BANK TUNISIA,..........",  77, 130 , 'center');
  doc.text("Attestion que Mr.",  130, 130 , 'center');
   doc.text(this.selected,  70, 136 , 'center');
  for (let i = 0; i < 2; i++) {
    var num = this.Names[i].name;
if (num == this.selected)
{
  doc.text(this.Names[i].type,  160, 136 );
     doc.text(this.Names[i].numidvisa,  175, 136 );
}}

  doc.text("titulaire de la piéce d'identité",  135, 136 , 'center');
  doc.text(" a régularisé  l’incident de paiement relatif au chèque n°  ",  10, 142  );
  doc.text(this.numerocheque,  110, 142  );   
  doc.text("Objet du ",  170, 142  ); 
  doc.text("certificat de non-paiement n° ",10,148);    doc.text(this.Numero_CNP,  65, 148  );  doc.text(this.DATECNP,  120, 148  );
  doc.text("du ",  100, 148  );
  doc.text("et ce par (****) : ",  10, 154  );
  doc.text("1- Le paiement du montant du chèque* ou (*****) l’insuffisance de la provision et ",  10, 160 );
  doc.text("l’intérêt de retard revenant au bénéficiaire par :",  10, 166  );
  doc.text("!*!  Le versement par bordereau de versement du ",  30, 172  );
 // doc.text(this.DATEARP,  120, 172  );
  doc.text("la somme de ",  170, 172  );
 // doc.text(this.MNT_VERSE_String,  20, 178  );
  doc.text("au titre",  170, 178  );
  //
  doc.text("de reconstitution de la provision du chèque susvisé ainsi que la somme de",  10, 184  );
  //doc.text(this.L_INTRETARD_String,  20, 190  );
  doc.text("au titre de l’intérêt de retard revenant au porteur ",  115, 190  );
  doc.text("pour la période allant du (**) ",  10, 196  );//doc.text(this.DATECNP_RTND,  70, 196  );
  //
  doc.text("au (***) ",  110, 196  );// doc.text(this.DATEARP,  130, 196  );
  
  doc.text("         !_! La production en date du………………d ‘une quittance délivrée par la Trésorerie Générale de",  20, 202  );
  doc.text("Tunisie    en    date    du…………….     sous n°…………..                        relatif à la consignation du montant",  10, 208  );
  doc.text("de………………………………………………….D.T au titre de reconstitution de la provision du chèque susvisé",  10, 214  );
  doc.text("ainsi que l’intérêt de retard revenant au porteur pour la période allant du (**)…………………………………….au",  10, 220  );
  doc.text("(***)………….",  10, 226  );
  
  doc.text("!-!  La production en date du ",  30, 232  );doc.text(this.datelettre,  80, 232);
  //
  doc.text("de l’original du chèque susvisé et d’un acte écrit avec",  100, 232  );
  

  doc.text("signature légalisée du bénéficiaire  ",  10, 238  ); doc.setFontSize(9);doc.text(this.beneficiary,  65, 238);
  console.log(this.beneficiary) ;
  //
  doc.setFontSize(10);
  doc.text("datant du…………….. comportant  ",  120, 238  );
  doc.text("la reconnaissance du dit bénéficiaire d’avoir reçu du tireur du chèque un montant de   ",  10, 244  );
  doc.setFontSize(8);
  doc.text(this.MNT_VERSE_String,10,250)
  doc.setFontSize(10);
  doc.text("au titre de la provision du chèque",  140, 250  );
  //
  doc.setFontSize(9);

  doc.text("(*)Mettre «C» pour la carte d’identité Nationale,",15,260);
  doc.text("«S» pour la carte de séjour pour les étrangers résidents.",25,264);
  doc.text("«P» pour le passeport pour les étrangers non-résidents.",25,268);
  doc.text("(**)Cette date doit correspondre à celle du C.N.P",15,272);


  doc.text("(***)Cette date doit correspondre à la date de reconstitution de la provision",15,276);
  doc.text("(****) Le spécimen de la signature de l’agent doit être déposé auprès de la Banque Centrale.",15,280);
  
  doc.setFontSize(10);

  doc.addPage();
  doc.text("2- ! X! Le versement d’un montant de  ",15,20);doc.text(this.L_FEESHN_String,80,20);
  doc.text("en date du ",15,30); doc.text(this.datelettre,35,30);
  //
  doc.text("au titre de recouvrement des frais de signification de l’avis de ",70,30);
  doc.text("non paiement du chèque susvisé, notifié par Maître",15,36);doc.text(this.nomHN,100,36); doc.text(this.prenomHN,140,36);
  //
  doc.text("huissier notaire en date du ",15,42);doc.text(this.dateprot,60,42);
  doc.text("3- Le paiement de l’amende au profit du Trésor par :",15,52);
  doc.text(" !  X ! Le versement de la somme de ",15,60);   doc.setFontSize(8);
  doc.text(this.L_PENALTY_String,75,60); doc.setFontSize(10);
  doc.text(" en date du ",15,68);doc.text(this.datelettre,40,68);
  doc.text(" au profit du Trésor au titre de paiement de l’amende prévue  ",70,68);
  doc.text("  par l’article 412 ter  du Code de Commerce due au titre du chèque susvisé.",15,74);

  doc.text("!_!  La production en date du…………………… d’une quittance délivrée par la Trésorerie Générale",15,84);
  doc.text("de Tunisie en date du…. Sous n°…. prouvant le paiement de l’amende prévue par l’article 412 ter du",15,90);
  doc.text("Code de Commerce due au titre du chèque susvisé.",15,96);
  doc.text("Cette attestation est délivrée à l’intéressé (e) pour servir et valoir ce que de droit.",15,110);
window.open(doc.output('bloburl'), '_blank');
  }
  }
}

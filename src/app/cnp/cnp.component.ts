import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';
import {ARPExtService} from '../arp-ext.service'; 

@Component({
  selector: 'app-cnp',
  templateUrl: './cnp.component.html',
  styleUrls: ['./cnp.component.scss']
})
export class CnpComponent implements OnInit {
  pageHeight:any;
  pageWidth :any;
    imgdata:string="data:image/png;base64,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";
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
  selected1:string="";
  DATECNP_RTND:string="";
  REGULARISATNDATE:string="";
  err:string="";
  show2:boolean= false;  
  tab=[];
  adrs1:string;
  rccl:string;
  adrs2:string; 
  DATEEMISSION:string; 
  Names=[];
  LIEUEMISSION:string;
  DATEPRSNTCHEQUE:string;
  DATEPREAVIS:string;
  CODEDEVISE:string;
  BENEFICIARY:string;
  DATEDLVRCHEQUE:string;
  selectedS1:string;
  selectedS2:string;
  selectedS3:string;
  selectedS4:string;
  selectedS5:string;
  selectedS6:string;
  MOTIFREJET:any;
  MOTIF1=[];
  MOTIF2:string;
  MOTIF3:string;
  y:number;
    Names1=[];
    MOTIF=[];
    constructor(private arpext : ARPExtService,  private router: Router) { }
    data1;
    data2;

  ngOnInit(): void {

  }


  ExtractCNP(): void
  {

    this.showSpin=true;

    
    /* *************************ChequeReturned**************************** */
      this.arpext.ExtractChequeReturned(this.numerocheque).subscribe(
        dataCHQ=>
            {
            
            this.data1=dataCHQ;
            this.data1=(JSON.stringify(dataCHQ));
            var succes = this.data1.indexOf("SUCCESS");
            var notfound = this.data1.indexOf("No records");
      console.log(this.data1);
            if (succes != -1 && notfound  == -1) {
             
                
               this.FEESHN=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].feeshn;
               this.DATEARP=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].datearp;
               this.INTRETARD=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].intretard;
               this.DATECNP_RTND=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].rejectiondate;
               this.REGULARISATNDATE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].regularisatndate;
               this.BENEFICIARY=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].beneficiary;
               if (this.INTRETARD != "") {
                this.INTRETARD= this.INTRETARD.concat(' DT');
               }
               this.DATEARP = this.DATEARP.replace(this.regex, "$3.$2.$1")
               this.DATEARP= this.DATEARP.replace('.','/')
               this.DATEARP= this.DATEARP.replace('.','/')


               
              
               if (this.DATECNP_RTND != "") {
                 this.err1=true;
                 console.log(this.err1);
               }
               else
               {
                this.showSpin=false;
          
                this.err="Le certificat de non paiement n'a pas été encore saisi";
                this.showAlert=true;
                this.show2=!this.show2;
                setTimeout(() => {  
                location.reload();
              }, 3000); 
            }

               
                if (this.DATEARP == "") {
                  this.err2=true;
                  console.log(this.err2);
                }else
                {    
                  this.showSpin=false;

                  this.err="UN ARP a été établi pour ce Cheque";
                  this.showAlert=true;
                  this.show2=!this.show2;
                  setTimeout(() => {  
                    location.reload();
                  }, 2000); 
              }
                
                  if (this.REGULARISATNDATE == "") {
                    this.err3=true;
                    console.log(this.err2);
                  }
                  else
{
  this.showSpin=false;

  this.err="Ce Cheque a été regularisé";
  this.showAlert=true;
  this.show2=!this.show2;
  setTimeout(() => {  
    location.reload();
  }, 2000); 
}
                
          }
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
          console.log(this.err1,this.err2,this.err3);



    /* *************************sdetails**************************** */
    this.arpext.Extractsdetails(this.numerocheque).subscribe(
      datasde=>
          {
           this.data1=datasde;
           this.data1=(JSON.stringify(datasde));
           var succes = this.data1.indexOf("SUCCESS"); 
           console.log(this.data1)    
           if (succes != -1) {     
           
               this.IdSdetails=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].id;
               this.Ribtireur1=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribtireur;
               this.ribporteur1=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribporteur;
               this.Code_Bnk=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribporteur;
               this.DATECNP=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].datecnp;
               this.DATEEMISSION=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].dateemission;
                this.LIEUEMISSION=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].lieuemission;
               this.DATEPRSNTCHEQUE=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].dateprsntcheque;
                this.DATEPREAVIS=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].datepreavis;
                this.CODEDEVISE=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].codedevise;
                this.MOTIFREJET=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].motifrejet;
                this.DATEDLVRCHEQUE=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].datedlvrcheque;
               this.DATEEMISSION = this.DATEEMISSION.replace(this.regex, "$3.$2.$1")
               this.DATEEMISSION= this.DATEEMISSION.replace('.','/')
               this.DATEEMISSION= this.DATEEMISSION.replace('.','/')

               this.DATEDLVRCHEQUE = this.DATEDLVRCHEQUE.replace(this.regex, "$3.$2.$1")
               this.DATEDLVRCHEQUE= this.DATEDLVRCHEQUE.replace('.','/')
               this.DATEDLVRCHEQUE= this.DATEDLVRCHEQUE.replace('.','/')

               this.DATEPRSNTCHEQUE = this.DATEPRSNTCHEQUE.replace(this.regex, "$3.$2.$1")
               this.DATEPRSNTCHEQUE= this.DATEPRSNTCHEQUE.replace('.','/')
               this.DATEPRSNTCHEQUE= this.DATEPRSNTCHEQUE.replace('.','/')

               
               this.DATEPREAVIS = this.DATEPREAVIS.replace(this.regex, "$3.$2.$1")
               this.DATEPREAVIS= this.DATEPREAVIS.replace('.','/')
               this.DATEPREAVIS= this.DATEPREAVIS.replace('.','/')


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




               this.MOTIF.push(
                {
                  code:"01",
                  desc: "OPPOSITION POUR PERTE"
                },
                {
                  code:"02",
                  desc: "OPPOSITION POUR VOL"
                },
                {
                  code:"03",
                  desc: "OPPOSITION POUR FAILLITE"
                },
                {
                  code:"04",
                  desc: "OPPOSITION POUR AUTRES MOTIFS"
                },
                {
                  code:"10",
                  desc: "ABSENCE DE PROVISION"
                },
                {
                  code:"11",
                  desc: "INSUFFISANCE DE PROVISION"
                },
                {
                  code:"12",
                  desc: "INDISPONIBILITE DE LA PROVISION S-A"
                },
                {
                  code:"13",
                  desc: "COMPTE CLOTURE"
                },
                {
                  code:"14",
                  desc: "Cheque <=20D ne repond pas aux cond. de paiement"
                },
                {
                  code:"15",
                  desc: "Probleme de provision sur cheque tire sur soi-meme"
                },
                {
                  code:"16",
                  desc: "Montant reclame errone"
                },
                {
                  code:"17",
                  desc: "MONTANT MAL SAISI"
                },
                {
                  code:"17",
                  desc: "MONTANT MAL SAISI"
                },
                {
                  code:"20",
                  desc: "TITULAIRE DU COMPTE DECEDE"
                },
                {
                  code:"21",
                  desc: "DONNEES MAL SAISIES (NUM,DATE,LIEU)"
                },
                {
                  code:"22",
                  desc: "MANQUE EMPREINTE DU SCANNER"
                },
                {
                  code:"23",
                  desc: "MANQUE ENDOS BENEFEFICIAIRE"
                },
                {
                  code:"25",
                  desc: "IMAGE NON EXPLOITABLE TRONQUE FLOUE"
                },
                {
                  code:"30",
                  desc: "SIGNATURE MANQANTE(CPTE FONCT CONJ)"
                },
                {
                  code:"31",
                  desc: "VALEUR PRESCRITE"
                },
                {
                  code:"32",
                  desc: "MENTIONS OBLIGATOIRES MANQUANTES"
                },
                {
                  code:"33",
                  desc: "SIHNATURE NON CONFORME"
                },
                {
                  code:"34",
                  desc: "DONNEES ERRONNES (N.CONF ENFO&IMAGE"
                },
                {
                  code:"35",
                  desc: "ABSENCE DE SIGNATURE"
                },
                {
                  code:"36",
                  desc: "VALEUR MAL PRESENTEE"
                },
                {
                  code:"37",
                  desc: "Endossement irregulier"
                },
                {
                  code:"38",
                  desc: "valeur contrefaite"
                },
                {
                  code:"39",
                  desc: "Valeur mal acheminee"
                },
                {
                  code:"41",
                  desc: "LETTRE DE CHANGE CONTESTEE"
                },
                {
                  code:"42",
                  desc: "ABSENCE D INSTRUCTION DE PAIEMENT"
                },
                {
                  code:"43",
                  desc: "VALEUR DEJA REGLEE"
                },
                {
                  code:"44",
                  desc: "VALEUR DEJA REJETEE"
                },
                {
                  code:"45",
                  desc: "VALEUR NON PARVENUE"
                },
                {
                  code:"46",
                  desc: "PROROGATION LETTRE DE CHANGE"
                },
                {
                  code:"47",
                  desc: "OPERATION NON AUTOR PAI CPT EPARGNE"
                },
                {
                  code:"60",
                  desc: "AUTRES MOTIFS"
                },
                
              
              
                
              
                )
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
               var long= Number( this.MOTIFREJET.length)
               var nbr =long/2;
              
               for (let i = 0; i < nbr; i++) 
               {
                var num =this.MOTIFREJET.substr(0,2)
                if (num != "") {
                  for (let y = 0; y <= this.MOTIF.length; y++) {
                  if (num==this.MOTIF[y].code) 
                  {
                    this.MOTIF1.push(
                      {
                        Description: this.MOTIF[y].desc
                      },)
                      
                    this.MOTIFREJET=this.MOTIFREJET.replace(num,"");
                    num=this.MOTIFREJET;
                  }
                }
              }}

         
              


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

              console.log(this.IdSdetails1)
                this.nom2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].nomprenom;
                this.type2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].type;
                this.numidvisa2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].numidvisa;
                this.rccl=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].rccl;
                this.adrs1=dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].adresse1;
                this.adrs2=dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].adresse2;
               
               if (this.nom2!="") {
                this.Names.push(
                  {
                    type: this.type2.toString(),
                    name :this.nom2.toString(),
                    numidvisa:this.numidvisa2.toString(),
                    rccl:this.rccl.toString(),
                    adrs1:this.adrs1.toString(),
                    adrs2:this.adrs2.toString()
                  }
                ) 
               }
                

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

back():void
{
  this.router.navigate(['CHEQUERETURNED']);
}



selectChangeHandlerS1(event: any)
  {

   this.selectedS1 = event.target.value;
 

  }
  selectChangeHandlerS2(event: any)
  {

   this.selectedS2 = event.target.value;
 

  }
  selectChangeHandlerS3(event: any)
  {

   this.selectedS3 = event.target.value;
 

  }
  selectChangeHandlerS4(event: any)
  {

   this.selectedS4 = event.target.value;
 

  }
  selectChangeHandlerS5(event: any)
  {

   this.selectedS5 = event.target.value;
 

  }
  selectChangeHandlerS6(event: any)
  {

   this.selectedS6 = event.target.value;
 

  }




Print(): void {
  
  var doc = new jsPDF("landscape");
  this.pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  this.pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
 doc.addImage(this.imgdata,'PNG',260,10,25,10,);
 doc.setFontSize(9);
 doc.setFontStyle("bold");
 doc.text("Al Baraka Bank Tunisia ",10,10)
 
 doc.text("CERTIFICAT DE NON PAIEMENT DE CHEQUE",110,12)
 doc.text("ANNEXE N°4 A LA CIRCULAIRE AUX ETABLISSEMENTS DE CREDIT N° 2007-18 DU 05 JUILLET 2007",70,18)
 
 
 
 
 doc.text("- n° journalier du Certificat",19,24);doc.text(this.Numero_CNP,10,24)
 doc.text("32 Banque tirée : ALBARAKA BANK TUNISIA",10,30)
 doc.text("Banque présentatrice ",22,36);
 doc.setFontSize(7); 
 doc.text(this.Code_Bnk,10,36); 
 doc.text(this.Poste_code,60,36);
 doc.text(this.numerocheque,50,42);
 doc.text(this.DATECNP,260,30)
 doc.setFontSize(9); 

 doc.text("n° du chèque",25,42);
 doc.setFontSize(7); 

 doc.text(this.CODE_AGN_T,190,36);
 doc.text(this.Agence_Titre_1,240,36); 
 doc.text(this.CODE_AGN_P,190,42);
 ;doc.text(this.Agence_Titre,240,42);
 doc.setFontSize(9); 

 doc.text("Tunis le",200,30);
 doc.text("Agence tirée",200,36);
 doc.text("Agence présentatrice ",200,42) 
 
 doc.text("I- LE(S) SIGNATAIRE (S)  ",10,48)
 
 
 doc.setFontSize(7);
 doc.text("Pièce d'identité en cours de validité (1)",11,53)
 doc.rect(10, 50, 280, 20);
 doc.text("Type(2)",11,57);doc.text("Numéro",35,57)

 doc.rect(10, 50, 280, 8);
 doc.text("Nom et prénom",80,53)
 for (let i = 0; i < this.Names.length; i++) {
  var num = this.Names[i].name;

  if (num !="") {
if (num == this.selectedS1)
{
doc.text(this.Names[i].type,  15, 61);
   doc.text(this.Names[i].numidvisa,  35, 61 );
   doc.text(this.Names[i].adrs2,  130, 61 );
   doc.text(this.Names[i].adrs1,  225, 61 );
   doc.text(this.Names[i].rccl,  200, 61 );
   doc.text(this.selectedS1,  80, 61 );
}
} 

}


for (let i = 0; i < this.Names.length; i++) {
  var num = this.Names[i].name;

  if (num !="") {
if (num == this.selectedS2)
{
doc.text(this.Names[i].type,  15, 65);
   doc.text(this.Names[i].numidvisa,  35, 65 );
   doc.text(this.Names[i].adrs2,  130, 65 );
   doc.text(this.Names[i].adrs1,  225, 65 );
   doc.text(this.Names[i].rccl,  200, 65 );
   doc.text(this.selectedS2,  80, 65 );
}
} 

}



for (let i = 0; i < this.Names.length; i++) {
  var num = this.Names[i].name;

  if (num !="") {
if (num == this.selectedS3)
{
doc.text(this.Names[i].type,  15, 69);
   doc.text(this.Names[i].numidvisa,  35, 69 );
   doc.text(this.Names[i].adrs2,  130, 69 );
   doc.text(this.Names[i].adrs1,  225, 69 );
   doc.text(this.Names[i].rccl,  200, 69 );
   doc.text(this.selectedS3,  80, 69 );
}
} 

}

 doc.text("Date et lieu de naissance",130,53)
 doc.text("Code prof",172,53)
 doc.text("RC",200,53)
 doc.text("Adresse complète à la date du CNP et Code postal",225,53)
 
 doc.rect(10, 50, 50, 4);
 doc.rect(10, 54, 50, 4);
 doc.rect(10, 54, 20, 4);
 doc.rect(10, 58, 20, 4);
 doc.rect(10, 62, 20, 4);
 doc.rect(10, 66, 20, 4);
 
 
 doc.rect(60, 50, 60, 8);
 doc.rect(120, 50, 50, 8);
 //code prof
 doc.rect(170, 50, 15, 8);
 //RC
 doc.rect(185, 50, 35, 8);
 //Adresse complète à la date du CNP et Code postal
 
 
 doc.setFontSize(8);
 
 doc.text("II- LE (S) TITULAIRE(S) DU COMPTE",10,75)
 doc.setFontSize(7);
 
 doc.text("1/ -Personne Morale :",10,79);doc.text("RC",90,79);doc.text("VISA :",130,79)

 for (let i = 0; i < this.Names.length; i++) {
  var num = this.Names[i].rccl;
if (num != "")
{
  
doc.text(this.Names[i].name,  40, 91);
   doc.text(this.Names[i].adrs1,  180, 91 );
   doc.text(this.Names[i].rccl,  108, 79 );
}
num="";
}
 doc.rect(10, 82, 280, 10);
 doc.rect(10, 82, 280, 5);
 doc.rect(10, 82, 80, 10);
 doc.rect(10, 82, 100, 10);
 doc.rect(10, 82, 130, 10);
 doc.text("Dénomination",40,85);doc.text("Sigle",95,85);doc.text("Code Activité",115,85);doc.text("Siège Social à la date  du CNP et Code Postal",180,85)
 
 
 doc.text("2/ - Personne(s) Physique(s)",10,95)

 for (let i = 0; i < this.Names.length; i++) {
  var num = this.Names[i].name;
if (num == this.selectedS4)
{
doc.text(this.Names[i].type,  13, 111);
   doc.text(this.Names[i].numidvisa,  35, 111 );
   doc.text(this.Names[i].adrs2,  130, 111 );
   doc.text(this.Names[i].adrs1,  225, 111 );
   doc.text(this.Names[i].rccl,  200, 111 );
   doc.text(this.selectedS4,  80, 111 );
}
}
for (let i = 0; i < this.Names.length; i++) {
  var num = this.Names[i].name;
if (num == this.selectedS5)
{
doc.text(this.Names[i].type,  13, 115);
   doc.text(this.Names[i].numidvisa,  35, 115 );
   doc.text(this.Names[i].adrs2,  130, 115 );
   doc.text(this.Names[i].adrs1,  225, 115 );
   doc.text(this.Names[i].rccl,  200, 115 );
   doc.text(this.selectedS5,  80, 115 );
}
}

for (let i = 0; i < this.Names.length; i++) {
  var num = this.Names[i].name;
if (num == this.selectedS6)
{
doc.text(this.Names[i].type,  13, 119);
   doc.text(this.Names[i].numidvisa,  35, 119 );
   doc.text(this.Names[i].adrs2,  130, 119 );
   doc.text(this.Names[i].adrs1,  225, 119 );
   doc.text(this.Names[i].rccl,  200, 119 );
   doc.text(this.selectedS6,  80, 119 );
}
}



 doc.text("Pièce d'identité en cours de validité (1)",11,103)
 doc.rect(10, 100, 280, 20);
 doc.text("Type(2)",11,107);doc.text("Numéro",35,107)
 doc.rect(10, 100, 280, 8);
 doc.text("Nom et prénom",80,103);
 
 doc.text("Date et lieu de naissance",130,103)
 doc.text("Code prof",172,103)
 doc.text("RC",200,103)
 doc.text("Adresse complète à la date du CNP et Code postal",225,103)
 
 
 
 doc.rect(10, 100, 50, 4);
 doc.rect(10, 104, 50, 4);
 doc.rect(10, 104, 20, 4);
 doc.rect(10, 108, 20, 4);
 doc.rect(10, 112, 20, 4);
 doc.rect(10, 116, 20, 4);
 
 
 doc.rect(60, 100, 60, 8);
 doc.rect(120, 100, 50, 8);
 //code prof
 doc.rect(170, 100, 15, 8);
 //RC
 doc.rect(185, 100, 35, 8);
 
 
 
 
 doc.setFontSize(8);
 
 doc.text("III - LE CHEQUE :",10,125)
 
 doc.setFontSize(7);
 doc.text("N°",12,128);doc.text("émis-le :",50,128);doc.text("à",90,128);doc.text("sur compte(RIB)",100,128);doc.text("Date de présentation:",155,128);doc.text("Date  préavis:",198,128);doc.text("Montant en  chiffres du chèque",230,128)
 doc.text(this.numerocheque,20,128);doc.text(this.DATEEMISSION,65,128);doc.text(this.LIEUEMISSION,93,128); ;doc.text(this.Ribtireur1,125,128); doc.text(this.DATEPRSNTCHEQUE,182,128);doc.text(this.DATEPREAVIS,215,128);doc.text(this.montantcheque.concat(" DT"),270,128)

 doc.text("Montant en lettres  du chèque ",12,132);doc.text("Code devises",160,132);;doc.text("Montant en dinars de la provision :",190,132);
 doc.text(this.MNT_VERSE_String,70,132);doc.text(this.CODEDEVISE,180,132);
 if (this.MONTANTPROVISION=="") {
  doc.text("NEANT",260,132);
 }else{
  doc.text(this.MONTANTPROVISION,260,132);
 }
 doc.text("Date de  délivrance du chéquier :",12,136);doc.text("Endosseurs (1)",80,136);doc.rect(102, 133, 5, 5)       ;doc.text("ENDOS 	Nom, Prénom du dernier  porteur:",110,136);
doc.text(this.DATEDLVRCHEQUE,60,136) ;doc.text(this.BENEFICIARY,180,136)

 doc.setFontSize(8);
 
 doc.text("IV -  MOTIFS  DU REJET :",10,140);
 doc.setFontSize(7);
 
 doc.text("1/ Motifs liés à la provision",25,145);doc.rect(105, 145, 80, 25);doc.text("Confirmation motif du rejet :",105,143)
 
/* var x=0 
 if(x<=3)
 {
 if (this.MOTIF1[1].Description!="")
  {
x=x+1;
  doc.text(this.MOTIF1[1].Description,105,148)

 }
 if (this.MOTIF1[2].Description!="")
 {
  x=x+1;
  doc.text(this.MOTIF1[2].Description,105,152)
 }
 if (this.MOTIF1[3].Description!="")
 {
  x=x+1;
  doc.text(this.MOTIF1[3].Description,105,152)
 }
if (this.MOTIF1[4].Description!="") 
{
  x=x+1;
}
}
else{
  console.log("il existe 4 motifs ou plus ,verifiez les motifs de rejet")
}*/
this.y=152;
for (let i = 0; i < this.MOTIF1.length; i++) {
  
if(this.MOTIF1[i].Description!=""){
doc.text(this.MOTIF1[i].Description,110,this.y)
this.y=this.y+4;
}

console.log(this.y);
}


 doc.text("A",25,150);doc.rect(30, 148, 3, 3);doc.text("Absence de provision",40,150);
 doc.text("B",25,154);doc.rect(30, 152, 3, 3);doc.text("Insuffisance de provision",40,154);
 doc.text("C",25,158);doc.rect(30, 156, 3, 3);doc.text("Indisponibilité de la provision (saisie-arrêt…..)",40,158);
 doc.text("D",25,162);doc.rect(30, 160, 3, 3);doc.text("Autres motifs à préciser",40,162);
 
 
 doc.text("2/ Opposition",235,145)
 doc.text("P",235,150);doc.rect(240, 148, 3, 3);doc.text("Perte",250,150);
 doc.text("V",235,154);doc.rect(240, 152, 3, 3);doc.text("Vol",250,154);
 doc.text("F",235,158);doc.rect(240, 156, 3, 3);doc.text("Faillite du porteur",250,158);
 doc.text("M",235,162);doc.rect(240, 160, 3, 3);doc.text("Autres motifs à préciser",250  ,162);
 
 doc.setFontSize(8);
 
 doc.text("V - HUISSIER NOTAIRE",10,173)
 
 doc.setFontSize(7);
 doc.text(" Nom et Prénom",50,173);doc.rect(70, 170, 45, 4);doc.text("Date de réception de l'avis par l'huissier  ",120,173);doc.rect(167, 170, 20, 4);doc.text(" Date de l'exploit d'huissier",190,173);doc.rect(222, 170, 15, 4);doc.text("Date lettre recommandée",240,173);doc.rect(270, 170, 15, 4)
 doc.text("Nous certifions que le chèque objet du présent certificat de non-paiement. (4)",120,177);;doc.rect(216, 174, 20, 4)
 doc.text("le",240,177);doc.rect(245, 174, 20, 4)
 doc.setFontSize(6);


 doc.text("CACHET ET SIGNATURE AUTORISEE",220, 180 , 'center');
 doc.text("Avec indication des nom et prénom du signataire (***) ",223, 184 , 'center');
 
 doc.text("1- Joindre obligatoirement une photocopie de la pièce d'identité à l'exemplaire destiné à la B.C.T pour le premier incident.",10,190);
 doc.text("2- Mettre 'C' pour la CIN, 'S' pour la carte de séjour  pour les étrangers résidents et 'P' pour le passeport pour les étrangers  non-résidents",10,193);
 doc.text("3- Mettre (T) pour les chèques émis en Tunisie et (E) pour les chèques émis à l'étranger  ",10,196);
 doc.text("4- Préciser expressément 'a été régularisé', en cas de régularisation.",10,199);
 doc.text("5- Le spécimen de la signature de l'agent doit être  déposé auprès de la Banque Centrale.",10,202);
 doc.text("Remarque : s'assurer que les informations portées dans ce document sont complètes et exactes et vérifier avant toute transmission sur support informatique, que le dessin d'enregistrement a été respecté et que la saisie est  conforme au document.",10,204);
 
 
 window.open(doc.output('bloburl'), '_blank');
  
   }
 }
 
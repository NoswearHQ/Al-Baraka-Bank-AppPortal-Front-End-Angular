import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {KYCService} from '../kyc.service';
import { Router } from '@angular/router';
import {LDCService} from '../ldc.service';
import {ARPExtService} from '../arp-ext.service'; 
@Component({
  selector: 'app-preve',
  templateUrl: './preve.component.html',
  styleUrls: ['./preve.component.scss']
})
export class PreveComponent implements OnInit {
imgdata:string="data:image/png;base64,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";
RIB
show2
succMessage
CONTRAT=[];
names=[];
showSpin:boolean=false
coderibcedant
succ
Verif1:boolean
nomTireur
prenomTireur
show1:boolean
DateForm
nbrpage
nbrpageInt
idcompte;
REJET1=[]
CODEBANK=[]
BANK=[]
showprint:boolean=false
regex:any= /^(\d{4})(\d{2})(\d{2})$/;
amt
compteclcr
comptecldb
dateecheance
datetele
id
motifrejet
nomclcr
nomcldb
refcommtire
typerejet
ribtbank="32"
namebank
idbank
dateoperation
montantprelev
numeroprelev
ribpayeur 
codeinstdest
nominstdest 
nominstemett 
ribemetteur 
datecompens 
datetr
ribtireurbank
numcontrat
constructor(private arpext : ARPExtService,private router: Router,private arpext1 : KYCService,private arpext2 : LDCService) { }
data1;
datenow

  ngOnInit(): void {
  }
  Extractprevout(): void
  {
    this.showSpin=!this.showSpin  ;
    this.datenow = new Date();
    var dd = String(this.datenow.getDate()).padStart(2, '0');
    var mm = String(this.datenow.getMonth() + 1).padStart(2, '0'); 
    var yyyy = this.datenow.getFullYear();
    
    this.datenow = yyyy + '-' + mm + '-' + dd;
    
    if(this.DateForm<this.datenow)
    {
     
        this.DateForm=this.DateForm.replace("-","")
        this.DateForm=this.DateForm.replace("-","")
    this.arpext2.ExtractPrevout(this.RIB,this.DateForm).subscribe(
      dataComp=>
          {
          this.data1=dataComp;
          console.log(dataComp)
          this.data1=(JSON.stringify(dataComp));
          this.nbrpage=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType.length;
          this.nbrpageInt=parseInt(this.nbrpage)
          this.succ=dataComp.value.status.successIndicator
        }
        );





if (this.succ=="SUCCESS") {
  




 setTimeout(() => {
          this.arpext2.ExtractPrevout(this.RIB,this.DateForm).subscribe(
            dataComp=>
                {
                  
        setTimeout(() => {
                  for (let i = 0; i < this.nbrpageInt; i++) 
                  {
                this.data1=dataComp;
                this.data1=(JSON.stringify(dataComp));

                
                this.dateoperation=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].dateoperation;
                this.numcontrat=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].numcontrat;
                this.montantprelev=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].montantprelev;
                this.numeroprelev=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].numeroprelev;
                this.ribpayeur=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].ribpayeur;
                this.codeinstdest=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].codeinstdest;
                this.nominstdest=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].nominstdest;
                this.nominstemett=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].nominstemett;
                this.ribemetteur=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].ribemetteur;
                this.dateecheance=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].dateecheance;
                this.datecompens=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].datecompens;
                this.datetr=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].datetr;
                this.motifrejet=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].motifrejet;
                this.typerejet=  dataComp.value.sibtelprelevouttype[0].gsibtelprelevoutdetailType.msibtelprelevoutdetailType[i].typerejet;
                this.ribtireurbank=this.ribpayeur.substr(0,5)
                this.dateoperation = this.dateoperation.replace(this.regex, "$3.$2.$1")
                this.dateoperation= this.dateoperation.replace('.','/')
                this.dateoperation= this.dateoperation.replace('.','/')


                this.dateecheance = this.dateecheance.replace(this.regex, "$3.$2.$1")
                this.dateecheance= this.dateecheance.replace('.','/')
                this.dateecheance= this.dateecheance.replace('.','/')

                
                this.datecompens = this.datecompens.replace(this.regex, "$3.$2.$1")
                this.datecompens= this.datecompens.replace('.','/')
                this.datecompens= this.datecompens.replace('.','/')
                
                this.datetr = this.datetr.replace(this.regex, "$3.$2.$1")
                this.datetr= this.datetr.replace('.','/')
                this.datetr= this.datetr.replace('.','/')
                
         
this.REJET1.push(
  {
    rank: i,
    dateoperation:this.dateoperation.toString(),
    montantprelev:this.montantprelev.toString(),
    numeroprelev:this.numeroprelev.toString(),
    ribpayeur:this.ribpayeur.toString(),
    codeinstdest:this.codeinstdest.toString(),
    nominstdest:this.nominstdest.toString(),
    nominstemett:this.nominstemett.toString(),
    ribemetteur:this.ribemetteur.toString(),
    dateecheance:this.dateecheance.toString(),
    datecompens:this.datecompens.toString(),
    datetr:this.datetr.toString(),
    motifrejet:this.motifrejet.toString(),
    typerejet:this.typerejet.toString(),
    numcontrat:this.numcontrat.toString(),

  },
)
  this.CODEBANK.push(
    {
      id:i,
      name:this.ribtireurbank
    },
    )
    
   
  this.CONTRAT.push(
    {
      id:i,
      name:this.numcontrat
    }
    )

              }
            }, 2000);
              
          }
          
              );
           }, 3000);
 /*           
setTimeout(() => {
  for (let index = 0; index < this.CODEBANK.length; index++) {
    console.log(this.CODEBANK[index].id)
    console.log(this.CODEBANK[index].name)
    
  }
}, 12000);*/
           setTimeout(() => {

              for (let index = 0; index < this.CONTRAT.length; index++) {
                //var t1=this.CODEBANK
                this.arpext2.ExtractNom(this.CONTRAT[index].name).subscribe(
                  dataCus1=>
                      {
                        //console.log("dddd")
                        var succes = this.data1.indexOf("SUCCESS");     
                        if (succes != -1) 
                        { 
                         // this.show=true;
                      this.data1=dataCus1;

                      this.data1=(JSON.stringify(dataCus1));
             this.nomcldb=dataCus1.value.rejetcptcpttype[0].grejetcptcptdetailType.mrejetcptcptdetailType[0].nomcldb;
              this.refcommtire=dataCus1.value.rejetcptcpttype[0].grejetcptcptdetailType.mrejetcptcptdetailType[0].refcommtire;
              this.names.push(
                {
                  nomcldb:this.nomcldb,
                  refcommtire:this.refcommtire
                }
                )
                    }           
                  }
                    );
              }
              this.showSpin=!this.showSpin;    
            this.showprint=!this.showprint
            }, 12000);




            setTimeout(() => {
            for (let index = 0; index < this.CODEBANK.length; index++) {
              //var t1=this.CODEBANK
              this.arpext.ExtractBcsortcode(this.CODEBANK[index].name).subscribe(
                dataCus2=>
                
                    {
                      var succes = this.data1.indexOf("SUCCESS");     
                      if (succes != -1) 
                      { 
                       // this.show=true;
                    this.data1=dataCus2;
                    this.data1=(JSON.stringify(dataCus2));
            this.namebank=dataCus2.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name;
            this.idbank=dataCus2.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].id;
            this.BANK.push(
              {
                id:this.idbank,
                name:this.namebank
              }
              )
                  }           
                }
                  );
            }
            setTimeout(() => {
              this.showSpin=!this.showSpin;    
              this.showprint=!this.showprint   
            }, 14500);
           
          }, 13000);

        }  
      }else
      {
        this.Verif1=!this.Verif1;
        if (this.showSpin==true) {
          this.showSpin=!this.showSpin;
        }
        this.show2=!this.show2
        this.succMessage="Date opération non valide"
      }
  }



  Verif():void
  {
    
    if (this.RIB.substr(11,1)=="0" && this.RIB.substr(12,1)=="0" ) {
      this.coderibcedant=this.RIB.substr(13,4); 
    }
    else if (this.RIB.substr(11,1)=="0")
    {
      this.coderibcedant=this.RIB.substr(12,5);
    }
    else if (this.RIB.substr(11,1)!="0")
    {
      this.coderibcedant=this.RIB.substr(11,6);
    }
  
       this.arpext1.ExtractCustomer(this.coderibcedant).subscribe(
                dataCus=>
                    {
                      
                      
                      this.succ=dataCus.value.status.successIndicator;
                        
                      if (this.succ == "SUCCESS") { 
                        if (this.show2==true) {
                          this.show2=!this.show2;
                        }
                        if (this.showSpin==true) {
                          this.showSpin=!this.showSpin;
                        }
                       this.Verif1=!this.Verif1;
                    this.data1=dataCus;
                    this.data1=(JSON.stringify(dataCus));
            this.nomTireur=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].nom;
            this.prenomTireur=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].prenom;
            this.nomTireur=this.nomTireur.concat(" ").concat(this.prenomTireur)
            
                  } else{
                   this.show1=!this.show1;
                    setTimeout(() => {
                      location.reload();

                    }, 2000);
                  }
                }
                  );
  }
  back():void
  {
    this.router.navigate(['prev']);

  }
  Clear():void
  {
        location.reload();
  }
  Print():void
  {
    
    var doc = new jsPDF();
    doc.addImage(this.imgdata,'PNG',160,7,30,20,);
    doc.setDrawColor(255, 178, 0); // draw yellow lines
    doc.setLineWidth(1);
    doc.line(2, 20, 157, 20)
    doc.setDrawColor(255, 0, 0); // draw red lines
    doc.line(2, 25, 206, 25)

    doc.setFontSize(16);
    doc.setFontStyle("bold");
    doc.text("Avis de Rejets Prelevements",55,35);

    doc.setFontSize(14);
    doc.setFontStyle("bold");
    /* rank: i,
    dateoperation:this.dateoperation.toString(),
    montantprelev:this.montantprelev.toString(),
    numeroprelev:this.numeroprelev.toString(),
    ribpayeur:this.ribpayeur.toString(),
    codeinstdest:this.codeinstdest.toString(),
    nominstdest:this.nominstdest.toString(),
    nominstemett:this.nominstemett.toString(),
    ribemetteur:this.ribemetteur.toString(),
    dateecheance:this.dateecheance.toString(),
    datecompens:this.datecompens.toString(),
    datetr:this.datetr.toString(),
    motifrejet:this.motifrejet.toString(),
    typerejet:this.motifrejet.toString(), */
    for (let i = 0; i<1; i++)
    { 
if(this.REJET1[i])
{
  doc.setFontSize(14);
  doc.setFontStyle("bold");
  doc.text(this.REJET1[i].nominstemett,50,80);
  doc.text(this.REJET1[i].ribemetteur,50,95);
  doc.text(this.REJET1[i].numcontrat,100,110);
  doc.text(this.REJET1[i].ribpayeur,50,125);


  for(let z=0;z<this.names.length;z++)
  {
    var num3=this.names[z].refcommtire
    var num5=this.REJET1[i].numcontrat
    if (num3==num5) {
      doc.setFontSize(14);
      doc.setFontStyle("bold");
     // doc.text(this.BANK[x].name,50,230);


      doc.text(this.names[z].nomcldb,50,140);
    }

  }


  doc.text(this.REJET1[i].montantprelev.concat(" TND"),90,155);
  doc.text(this.REJET1[i].dateecheance,70,170);
  doc.text(this.REJET1[i].datecompens,70,185);
  doc.text(this.REJET1[i].typerejet,70,200);
  doc.text(this.REJET1[i].motifrejet,50,215);

  for(let x=0;x<this.BANK.length;x++)
  {
    console.log(num3,"----",num5)

    var num3=this.BANK[x].id
    var num5=this.REJET1[i].ribpayeur.substr(0,5)
    if (num3==num5) {
      doc.setFontSize(14);
      doc.setFontStyle("bold");
      doc.text(this.BANK[x].name,50,230);
    }

  }




 

}

    }

   /* rank: i,
              nomtire:this.nomtire.toString(),
              nomcedant:this.nomcedant.toString(),
              dateecheance: this.dateecheance.toString(),
              motifrejet: this.motifrejet.toString(),
              ribtireur: this.ribtireur.toString(),
              numeroeffet: this.numeroeffet.toString(),
              mnteffet: this.mnteffet.toString(),
              datecompens: this.datecompens.toString(),
              reserved3: this.reserved3.toString()*/
    doc.text("Tireur :",10,80);
    doc.text("RIB du Tireur :",10,95);
    doc.text("Référence unique du Titre de crédit :",10,110);
    doc.text("RIB du tiré :",10,125); //doc.text(this.ribtireur,50,125);
    doc.text("Nom du tiré :",10,140);//doc.text(this.nomtire,50,140);
    doc.text("Montant du prélèvement impayé:",10,155);// doc.text(this.mnteffet,90,155);
    doc.text("Date d'échéance :",10,170);//doc.text(this.dateecheance,90,170);
    doc.text("Date du rejet :",10,185)//;doc.text(this.datecompens,90,185);
    doc.text("Type de rejet :",10,200); //   doc.text(this.reserved3,50,200);
    doc.text("Motif de rejet :",10,215);  //  doc.text(this.motifrejet,50,215);
    doc.text("Banque :",10,230);  //  doc.text(this.nommotifrejet,50,230);
      //  doc.text(this.BANK[1],50,245);

  
    


    doc.setDrawColor(255, 178, 0); // draw yellow lines
    doc.line(2, 275, 206, 275)
    doc.setFontSize(9);
    doc.setFontStyle("bold");
    doc.text("Ce document est generé automatiquement ne nécessite pas de signature et cachet d'ALBARAKA ",37,280);
    doc.text("BANK",100,285);
this.nbrpageInt=parseInt(this.nbrpage)
    for (let i = 1; i <this.nbrpageInt; i++)
    {
      doc.addPage();
      doc.addImage(this.imgdata,'PNG',160,7,30,20,);
      doc.setDrawColor(255, 178, 0); // draw yellow lines
      doc.setLineWidth(1);
      doc.line(2, 20, 157, 20)
      doc.setDrawColor(255, 0, 0); // draw red lines
      doc.line(2, 25, 206, 25)
  
      doc.setFontSize(16);
      doc.setFontStyle("bold");
      doc.text("Avis de Rejets Prelevements",55,35);
  
      doc.setFontSize(14);
      doc.setFontStyle("bold");
      doc.text("Tireur :",10,80);
      doc.text("RIB du Tireur :",10,95);
      doc.text("Référence unique du Titre de crédit :",10,110);
      doc.text("RIB du tiré :",10,125); //doc.text(this.ribtireur,50,125);
      doc.text("Nom du tiré :",10,140);//doc.text(this.nomtire,50,140);
      doc.text("Montant du prélèvement impayé:",10,155);// doc.text(this.mnteffet,90,155);
      doc.text("Date d'échéance :",10,170);//doc.text(this.dateecheance,90,170);
      doc.text("Date du rejet :",10,185)//;doc.text(this.datecompens,90,185);
      doc.text("Type de rejet :",10,200); //   doc.text(this.reserved3,50,200);
      doc.text("Motif de rejet :",10,215);  //  doc.text(this.motifrejet,50,215);
      doc.text("Banque :",10,230);  //  doc.text(this.nommotifrejet,50,230);



      doc.setDrawColor(255, 178, 0); // draw yellow lines
      doc.line(2, 275, 206, 275)
      doc.setFontSize(9);
      doc.setFontStyle("bold");
      doc.text("Ce document est generé automatiquement ne nécessite pas de signature et cachet d'ALBARAKA ",37,280);
      doc.text("BANK",100,285);
      doc.setFontSize(14);
      doc.setFontStyle("normal");
     
  if(this.REJET1[i])
  {
    doc.setFontSize(14);
    doc.setFontStyle("bold");
    doc.text(this.REJET1[i].nominstemett,50,80);
    doc.text(this.REJET1[i].ribemetteur,50,95);
    doc.text(this.REJET1[i].numcontrat,100,110);
    doc.text(this.REJET1[i].ribpayeur,50,125);
    for(let z=0;z<this.names.length;z++)
    {
      var num3=this.names[z].refcommtire
      var num5=this.REJET1[i].numcontrat
      if (num3==num5) {
        doc.setFontSize(14);
        doc.setFontStyle("bold");
       // doc.text(this.BANK[x].name,50,230);
  
  
        doc.text(this.names[z].nomcldb,50,140);
      }
  
    }
  
    doc.text(this.REJET1[i].montantprelev.concat(" TND"),90,155);
    doc.text(this.REJET1[i].dateecheance,70,170);
    doc.text(this.REJET1[i].datecompens,70,185);
    doc.text(this.REJET1[i].typerejet,70,200);
    doc.text(this.REJET1[i].motifrejet,50,215);
  
    for(let x=0;x<this.BANK.length;x++)
    {
      console.log(num3,"----",num5)
      var num3=this.BANK[x].id
      var num5=this.REJET1[i].ribpayeur.substr(0,5)
      if (num3==num5) {
        doc.setFontSize(14);
        doc.setFontStyle("bold");
        doc.text(this.BANK[x].name,50,230);
      }
  
    }
  
  
    
/*
var num4=this.REJET1[i].ribtireur.substr(0,5)

    this.arpext.ExtractBcsortcode(num4).subscribe(
      dataCus=>
          {
            var succes = this.data1.indexOf("SUCCESS");     
            if (succes != -1) 
            { 
          this.data1=dataCus;
          this.data1=(JSON.stringify(dataCus));
  this.namebank=dataCus.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name;
        }
        doc.text(this.namebank,50,245); }
        );
        */
  
  
  
  }
  
      
     

   
    }

    window.open(doc.output('bloburl'), '_blank');

  }
}

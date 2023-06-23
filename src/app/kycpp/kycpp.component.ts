import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import {KYCService} from '../kyc.service';

@Component({
  selector: 'app-kycpp',
  templateUrl: './kycpp.component.html',
  styleUrls: ['./kycpp.component.scss']
})
export class KycppComponent implements OnInit {
  imgdata:string="data:image/png;base64,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";
  IdCustomer:string;
ZERONORECORDS:string;
DATETODAY:string;
AGENCE:string;
CUSID:string;
DATERELATION:string;
NUMIDT:string;
TYPEIDT:string;
DATDEMANDEIDT:string;
LEGALEXP:string;
LIEUEMI:string;
MATFISC:string;
ADRESSE:string;
REVENUSANNUELS:string;
NATUREMANDAT:string;
PRODUCT:string;
NOM:string;
NATIONALITY:string;
LIEUNAIS:string;
BIRTH:string;
CODEPOST:string;
COUNTRY:string;
TEL:string;
EMP:string;
SALARIECHECK:string;
MARIECHECK:string;
CELIBATAIRECHECK:string;
DIVORCECHECK:string;
VEUFCHECK:string;
RESIDENT:string;
PPE:string;
OPERINTER:string;
BANQUECHECK:string;
MAJEURCHECK:string;
MINEURCHECK:string;
DEMSPONTCHECK:string;
RECOMTIERSCHECK:string;
INITBNKCHECK:string;
RECOMCOLABCHECK:string;
RISKCLASS:string;
MNTOPERATION:string;
BANQUENOMLOCALE:string;
BANQUENOMETRANGERE:string;
OPERINTERPAYS:string;
prenom:string;
show:boolean= false;
tab=[];

  showSpin:boolean= false;
  showAlert:boolean= false;
  err:string;
  show2:boolean= false;  

  constructor(private router: Router,private arpext1 : KYCService) { }
  data1;
  ngOnInit(): void {
    this.show2=true;
  }
  extraireKYCPP():void
  {
    this.showSpin=true;

      this.arpext1.ExtractCustomer(this.IdCustomer).subscribe(
        dataCus=>
            {            

              var succes =dataCus.value.status.successIndicator;
              this.ZERONORECORDS =dataCus.value.twskycpp2Type[0].zeronorecords;
              if (succes == "SUCCESS") { 
                if(this.ZERONORECORDS!="NO DATA"){

           // this.data1=dataCus;
            //this.data1=(JSON.stringify(dataCus));
        
                    this.DATETODAY=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].datetoday;
                    this.AGENCE=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].agence;
                    this.CUSID=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].cusid;
                    this.DATERELATION=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].daterelation;
                    this.NUMIDT=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].numidt;
                    this.TYPEIDT=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].typeidt;
                    this.DATDEMANDEIDT=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].datdemandeidt;
                    this.LEGALEXP=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].legalexp;
                    this.LIEUEMI=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].lieuemi;
                    this.MATFISC=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].matfisc;
                    this.ADRESSE=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].adresse;
                    this.REVENUSANNUELS=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].revenusannuels;
                    this.NATUREMANDAT=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].naturemandat;
                    this.PRODUCT=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].product;
                    this.NOM=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].nom;
                    this.NATIONALITY=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].nationality;
                    this.LIEUNAIS=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].lieunais;
                    this.BIRTH=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].birth;
                    this.CODEPOST=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].codepost;
                    this.COUNTRY=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].country;
                     this.TEL=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].tel;
                     this.EMP=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].emp;
                     this.SALARIECHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].salariecheck;
                     this.MARIECHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].mariecheck;
                     this.CELIBATAIRECHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].celibatairecheck;
                     this.DIVORCECHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].divorcecheck;
                     this.VEUFCHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].veufcheck;
                     this.RESIDENT=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].resident;
                     this.PPE=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].ppe;
                     this.OPERINTER=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].operinter;
                     this.BANQUECHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].banquecheck;
                     this.MAJEURCHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].majeurcheck;
                     this.MINEURCHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].mineurcheck;
                     this.DEMSPONTCHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].demspontcheck;
                     this.RECOMTIERSCHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].recomtierscheck;
                     this.INITBNKCHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].initbnkcheck;
                     this.RECOMCOLABCHECK=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].recomcolabcheck;
                     this.RISKCLASS=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].riskclass;
                     this.MNTOPERATION=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].mntoperation;
                     this.BANQUENOMLOCALE=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].banquenomlocale;
                     this.BANQUENOMETRANGERE=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].banquenometrangere;
                     this.OPERINTERPAYS=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].operinterpays;
                    this.prenom=dataCus.value.twskycpp2Type[0].gtwskycpp2DetailType.mtwskycpp2DetailType[0].prenom;
  


                    setTimeout(() => { 
                      this.tab.push(
                        {
                          champ:"Code Client",
                          name: this.IdCustomer.toString(),
                        },
                        
                        {
                          champ:"Nom et Prenom",
                          name: this.NOM.toString()
                        },
                        {
                          champ:"Agence",
                          name: this.AGENCE.toString()
                        },
                        )
                      }, 600);
    
          } else{
      
         
            this.showSpin=false;
      
            this.err=" NO DATA FOUND";
            this.showAlert=true;
            this.show2=!this.show2;
            setTimeout(() => {  
            location.reload();
          }, 3000); 
        }
          }}
         
      
        
          );
          

          this.showSpin=false;
          this.show=!this.show;
          this.show2=!this.show2;
  }


  Clear():void
  {
        location.reload();
  }
  back():void
  {
    this.router.navigate(['KYC']);
  }
  Print():void
  {
    const doc = new jsPDF();
    doc.addImage(this.imgdata, 'PNG', 10, 15, 25, 10);
    doc.rect(4, 4, 200, 290)

doc.setFontSize(10);
doc.setFontType("bold");
    doc.text("Date ",15, 40 );doc.text(" : ",60, 40 );doc.text(this.DATETODAY,80, 40 );
    doc.text("Agence",15, 50 );doc.text(" : ",60, 50 );doc.text(this.AGENCE,80, 50 );
    doc.text("Code client",15, 60 );doc.text(" : ",60, 60 );doc.text(this.IdCustomer,80, 60 );
    doc.text("Date d’entrée en relation",15, 70 );doc.text(" : ",60, 70 );doc.text(this.DATERELATION,80, 70 );
    doc.setFontSize(14);
    doc.text("Fiche KYC – Personne physique-",70, 90 );
    doc.setFontSize(12);
    doc.setFontType("bold");

    doc.text("  1.   INFORMATIONS GENERALES SUR LE CLIENT:",15, 112 );
    doc.setFontType("normal");
    doc.setLineWidth(0);
    doc.line(23, 113, 120, 113);
    doc.rect(50, 116, 3, 3);doc.text("Salarié", 55, 119)
    if (this.SALARIECHECK=="O") {
      doc.text("X", 50, 119);
    }else
    {
      doc.text("X", 120, 119);
    }
    ;doc.rect(120, 116, 3, 3);doc.text("Autres", 125, 119);




    //doc.text("x", 15, 116);
if (this.RESIDENT=="O") {
  doc.text("X", 60, 132);
}else
{
  doc.text("X", 120, 132);
}
    doc.text("Client Résident  : ",15, 132 ); doc.rect(60, 129, 3, 3) ;doc.text("Oui", 65, 132); doc.rect(120, 129, 3, 3);doc.text("Non", 125, 132);
  //doc.text("x", 15, 116);


  doc.text("Propriétaire: ",15, 140 );doc.rect(60, 137, 3, 3);  
   doc.text("Locataire: ",120, 140 );doc.rect(160, 137, 3, 3)
   //doc.text("x", 15, 116);
   doc.setFontType("bold");
   doc.text("DONNEES PERSONNELLES :",15, 152 );
   
  
   doc.setFontSize(11);
doc.setFontType("bold");
   doc.text(this.NOM,50, 158 );
   doc.text(this.LIEUNAIS,70, 166 );
doc.text(this.BIRTH,140, 166 )
doc.text(this.NATIONALITY,50, 174 )
doc.text(this.ADRESSE,50, 182 )
doc.text(this.CODEPOST,50, 190 )
doc.text(this.MATFISC,50, 216 )
doc.text(this.COUNTRY,140, 190 )
doc.text(this.TEL,50, 198 );
doc.setFontSize(12);
doc.setFontType("normal");
   doc.text("Nom et Prénom: ",15, 158 );  
   doc.text("Lieu de Naissance:",15, 166 );  ;doc.text("Date de Naissance:",95, 166 );
   doc.text("Nationalité :",15, 174 );
   doc.text("Rue:",15, 182 );
   doc.text("Code Postal:",15, 190 );doc.text("Pays:",95, 190 )
   doc.text("Tél/ GSM: ",15, 198 );doc.text("Fax: ",95, 198 )
   doc.text("E-Mail: ",15, 206 );
   doc.text("Mat. Fisc: ",15, 216 );
   doc.text("Employeur:",15, 224 );
   doc.text("Type de client:",15, 232 );
if (this.MAJEURCHECK=="O") 
{
  doc.text("X",70, 232 );
}
else
{
  doc.text("X",160, 232 );
}
   doc.text("Majeur: ",50, 232 );doc.rect(70, 229, 3, 3);  
   doc.text("Mineur/Incapable: ",120, 232 );doc.rect(160, 229, 3, 3)

   if (this.MARIECHECK=="O") 
   {
    doc.text("X",60, 240 )
   }
   if (this.CELIBATAIRECHECK=="O") 
   {
    doc.text("X",95, 240 )
   }
   if (this.DIVORCECHECK=="O") 
   {
    doc.text("X",135, 240 )
   }
   if (this.VEUFCHECK=="O") 
   {
    doc.text("X",165, 240 )
   }
   doc.text("Situation Familiale :",15, 240 ); doc.rect(60, 237, 3, 3);  doc.text("Marié(e) ",65, 240 ) 
                                            ; doc.rect(95, 237, 3, 3);  doc.text("Célibataire(e) ",100, 240 ) 
                                            ; doc.rect(135, 237, 3, 3);  doc.text("Divorcé(e) ",140, 240 ) 
                                            ; doc.rect(165, 237, 3, 3);  doc.text("Veuf(ve) ",170, 240 ) 
doc.text("Durée du séjour dans l'adresse résidentielle actuelle : ",15, 248 );

doc.setFontSize(14);
   doc.setFontType("bold");
doc.text("Paraphe client ",170, 260 );


/*                        Second Page                      */

doc.addPage();
doc.rect(4, 4, 200, 290)

doc.addImage(this.imgdata, 'PNG', 10, 15, 25, 10);

doc.setFontSize(11);
doc.setFontType("bold");
doc.text("DONNEES VERIFICATION DES DONNEES PERSONNELLES :",15, 30 );

doc.setFontSize(11);
doc.setFontType("bold");
;doc.text(this.TYPEIDT,50, 40 );
;doc.text(this.DATDEMANDEIDT,110, 40 );
;doc.text(this.LEGALEXP,160, 40 );
;doc.text(this.NUMIDT,50, 48 );
;doc.text(this.LIEUEMI,120, 48 );
;doc.text(this.REVENUSANNUELS,50, 68 );
doc.text(this.BANQUENOMLOCALE,50, 84 )
doc.text(this.BANQUENOMETRANGERE,50, 92 )
doc.text(this.NATUREMANDAT,50, 108 )
doc.text(this.PRODUCT,50, 40 )
doc.setFontSize(12);
doc.setFontType("normal");

doc.text("Type d’identité: ",15, 40 )
;doc.text("Validité du: ",80, 40 )
;doc.text("Au: ",140, 40 )
doc.text("Numéro: ",15, 48 )
doc.text("lieu d’émission: ",80, 48 )
doc.setFontSize(11);
doc.setFontType("bold");
doc.text("REVENUS : ",15, 60 );
doc.setFontSize(12);
doc.setFontType("normal");

doc.text("Salaires / Revenus annuels :  ",15, 68 )
if (this.BANQUECHECK=="O") 
{
  doc.text("X",95, 76 );
}
else
{
  doc.text("X",135, 76 );
}
doc.text("Bancarisé:",15, 76 ); doc.rect(95, 73, 3, 3);  doc.text("Oui",100, 76 ) ;doc.rect(135, 73, 3, 3);  doc.text("Non",140, 76 ) 
doc.text("Banques locales :",15, 84 );

doc.text("Banques Etrangères :",15, 92 );
if (this.PPE=="O") 
{
  doc.text("X",155, 100 )
  
}if (this.PPE=="N") 
{
  doc.text("X",175, 100 )

}
doc.text("Personne physique est-elle une Personne politiquement exposée PPE* :  ",15, 100 ); doc.rect(155, 97, 3, 3);  doc.text("Oui",160, 100 ) ;doc.rect(175, 97, 3, 3);  doc.text("Non",180, 100 ) 
doc.text("Si oui, préciser la nature du mandat: ",15, 108 );

doc.setFontType("bold");

doc.text(" 2. CIRCONSTANCES DE L’ENTREE EN RELATION:",15, 120 );
doc.setFontType("normal");
doc.setLineWidth(0);
doc.line(15, 121, 120, 121);
doc.setLineWidth(0);
if (this.DEMSPONTCHECK=="O") 
{
  doc.text("X",15, 140 )
}
if (this.RECOMTIERSCHECK=="O") 
{
  doc.text("X",105, 140 ) 
}
if (this.INITBNKCHECK=="O") 
{
  doc.text("X",15, 148 )
}
if (this.RECOMCOLABCHECK=="O") 
{
  doc.text("X",105, 148 )
}

; doc.rect(15, 137, 3, 3);  doc.text("Démarche spontanée ",20, 140 ) 
; doc.rect(105, 137, 3, 3);  doc.text("Recommandation d'un tiers ",110, 140 ) 
; doc.rect(15, 145, 3, 3);  doc.text("Initiative de la banque",20, 148 ) 
; doc.rect(105, 145, 3, 3);  doc.text("Recommandation d'un",110, 148 ) 
 
doc.text(" Principales motivations de l’ouverture du compte : ",15, 162 );
doc.rect(20, 164, 180, 10);
doc.setFontSize(14);
   doc.setFontType("bold");
doc.text("Paraphe client ",170, 220 );





doc.setFontSize(9);
doc.setFontType("bold");
doc.text("(*)Personnes Politiquement Exposées (PPE ou « Politically Exposed Persons PEP) :",10, 270 );
doc.text("L’expression personnes politiquement exposées (PPE), désigne les personnes physiques qui exercent ou ont exercé en Tunisie :",10, 276 );
doc.text(" ou dans un pays étranger, d'importantes fonctions publiques ou des missions représentatives ou politiques :",10, 282 );




/*                        3rd Page                      */

doc.addPage();
doc.rect(4, 4, 200, 290)

doc.addImage(this.imgdata, 'PNG', 10, 15, 25, 10);
doc.setFontSize(11);
doc.setFontType("bold");
doc.text("FONCTIONNEMENT ATTENDU DU COMPTE :",15, 30 );

doc.setFontSize(12);
doc.setFontType("normal");
doc.text("type des opérations :  ",15, 40 );
doc.text("Montants des opérations  :  ",15, 48 )

doc.setFontSize(10);
if (this.MNTOPERATION=="1 - 5000") 
{
  doc.text("X",15, 60 ) 
}
if (this.MNTOPERATION=="5000 - 10 000") 
{
  doc.text("X",55, 60 ) 
}
if (this.MNTOPERATION=="10 000 - 50 000") 
{
  doc.text("X",95, 60 ) 
}
if (this.MNTOPERATION=="50 000 - 100 000") 
{
  doc.text("X",135, 60 ) 
}
if (this.MNTOPERATION==">= 100 000") 
{
  doc.text("X",175, 60 ) 
}

                                            ; doc.rect(15, 57, 3, 3);  doc.text("1-5000 ",20, 60 ) 
                                            ; doc.rect(55, 57, 3, 3);  doc.text("5000-10 000 ",60, 60 ) 
                                            ; doc.rect(95, 57, 3, 3);  doc.text("10 000-50 000 ",100, 60 ) 
                                            ; doc.rect(135, 57, 3, 3);  doc.text("50 000-100 000",140, 60 ) 
                                            ; doc.rect(175, 57, 3, 3);  doc.text(">=100 000 ",180, 60 ) 
doc.setFontSize(12);
doc.text("Opérations internationales envisagées  :  ",15, 70 );
 doc.rect(95, 67, 3, 3);  doc.text("Non",100, 70 ) 
; doc.rect(135, 67, 3, 3);  doc.text("Oui, avec quel(s) pays ? ",140, 70 ) 
     

doc.setFontType("bold");

doc.text("3. LOI FATCA",15, 90 );
doc.setFontType("normal");
doc.setLineWidth(0);
doc.line(15, 91, 45, 91);
doc.setLineWidth(0);

doc.text("La relation répond-elle aux critères d’américanité (Loi FATCA) ?  ",15, 100 );
doc.text("personne née aux Etats-Unis :",15, 120 );     doc.rect(145, 117, 3, 3);  doc.text("Oui",150, 120 ) ;doc.rect(175, 117, 3, 3);  doc.text("Non",180, 120 ) 
doc.text("personne de nationalité américaine :",15, 128 );doc.rect(145, 125, 3, 3);  doc.text("Oui",150, 128 ) ;doc.rect(175, 125, 3, 3);  doc.text("Non",180, 128 )
doc.text("personne détenteur de la « GREEN CARD » :",15, 136 );doc.rect(145, 133, 3, 3);  doc.text("Oui",150, 136 ) ;doc.rect(175, 133, 3, 3);  doc.text("Non",180, 136 )
doc.text("Personne n’ayant une adresse de résidence, de correspondance ",15, 142 );doc.rect(145, 141, 3, 3);  doc.text("Oui",150, 144 ) ;doc.rect(175, 141, 3, 3);  doc.text("Non",180, 144 )
doc.text("ou une boîte postale (Post-office box) aux Etats-Unis :",15, 150 )


doc.text("Personne ayant donné procuration ou une délégation de",15, 158 );
doc.text("signature à une personne ayant une adresse américaine :",15, 164 );doc.rect(145, 161, 3, 3);  doc.text("Oui",150, 164 ) ;doc.rect(175, 161, 3, 3);  doc.text("Non",180, 164 ) 
doc.text("personne envoyant des instructions récurrentes de transfert ",15, 170 );

doc.text("de fonds sur un compte américain ",15, 178 );
doc.text("personne transmettant des directives (instructions ou fonds) ",15, 184 );doc.rect(145, 181, 3, 3);  doc.text("Oui",150, 184 ) ;doc.rect(175, 181, 3, 3);  doc.text("Non",180, 184 ) 


doc.text("depuis une adresse aux Etats-Unis :",15, 192 );doc.rect(145, 189, 3, 3);  doc.text("Oui",150, 192 ) ;doc.rect(175, 189, 3, 3);  doc.text("Non",180, 192 ) 
                                              

/*                        4rd Page                      */
                                            
doc.addPage();
doc.rect(4, 4, 200, 290)

doc.addImage(this.imgdata, 'PNG', 10, 15, 25, 10);
doc.setFontSize(11);
doc.setFontType("bold");
doc.text("-Engagement Du Client",85, 30 );
doc.text("Je soussigné(e)….......",15, 40 );

doc.setFontSize(12);
doc.setFontType("normal");
doc.text("Avez-vous d’autres bénéficiaires effectifs ?",15, 50 );doc.rect(145, 47, 3, 3);  doc.text("Oui",150, 50 ) ;doc.rect(175, 47, 3, 3);  doc.text("Non",180, 50 )

doc.rect(20, 52, 180, 10);

doc.text("Avez-vous autres personnes politiquement exposées à signaler ? ",15, 75 );doc.rect(145, 72, 3, 3);  doc.text("Oui",150, 75 ) ;doc.rect(175, 72, 3, 3);  doc.text("Non",180, 75 )
doc.rect(20, 77, 180, 10);

doc.rect(15, 100, 3, 3);  doc.text("Atteste que les informations fournies dans ci-dessus sont conformes et correctes.",20, 103 ) 
doc.rect(15, 110, 3, 3);  doc.text("Changement d’adresse ou toute information d’identification.",20, 113 ) 
doc.text("Fait le ….......à………",77, 121 ) 
doc.text("Lu et approuvé",82, 130 ) 
doc.setFontSize(12);
doc.setFontType("bold");
doc.text("Signature",85, 140 ) 

/*                        5rd Page                      */
doc.addPage();
doc.rect(4, 4, 200, 290)

doc.addImage(this.imgdata, 'PNG', 10, 15, 25, 10);
doc.setFontSize(11);
doc.setFontType("bold");
doc.text("Vérification Des Données Personnelles :",15, 30 );
doc.setFontSize(12);
doc.setFontType("normal");
doc.text("Documents Transmis Par La Relation" ,15, 38 );
doc.text("Copie d’une facture " ,15, 46 ); 
; doc.rect(55, 43, 3, 3);  doc.text(" SONEDE",60, 46 ) 
; doc.rect(95, 43, 3, 3);  doc.text("STEG ",100, 46 ) 
; doc.rect(115, 43, 3, 3);  doc.text("TELECOM",120, 46 ) 
; doc.rect(150, 43, 3, 3);  doc.text("Certificat de Résidance",155, 46 )
doc.text("Avis du chargé de clientèle :  " ,20, 60 );
doc.rect(20, 62, 180, 10);
doc.text("Signature",85, 80 ) 
doc.text("Avis du chargé de clientèle :  " ,20, 90 );
doc.rect(20, 92, 180, 10);
doc.text("Signature",85, 110 ) 
doc.text("Avis du responsable AML (en cas de profil client PPE) :  " ,20, 130 );
doc.rect(20, 132, 180, 10);

doc.setFontType("bold");

doc.text(" 1.	CLASSIFICATION DU CLIENT",15, 150 );
doc.setFontType("normal");
doc.text("Risque client :",15, 160 )   ; doc.rect(95, 157, 3, 3);  doc.text("Faible ",100, 160 ) 
; doc.rect(135, 157, 3, 3);  doc.text("Moyen ",140, 160 ) 
; doc.rect(165, 157, 3, 3);  doc.text("Elevé ",170, 160 ) 
doc.text("Signature",87, 180 ) 
doc.setFontType("bold");
doc.text("Décision de la Direction Générale",68, 200 ) 

doc.text("Date et signature",85, 220 ) 
    window.open(doc.output('bloburl'), '_blank');

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import {KYCService} from '../kyc.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-kycpld',
  templateUrl: './kycpld.component.html',
  styleUrls: ['./kycpld.component.scss']
})
export class KycpldComponent implements OnInit {
    imgdata:string="data:image/png;base64,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";
    show:boolean= false;
    tab=[];
    IdCustomer:string;
    ZERONORECORDS:string;
      showSpin:boolean= false;
      showAlert:boolean= false;
      err:string;
      show2:boolean= false;  
      datetoday:string;
      agence:string;
      cusid:string;
      daterelation:string;
      salariecheck:string;
      professionliberalcheck:string;
      prof:string;
      cincheck:string;
      passcheck:string;
      cscheck:string;
      numidt:string;
      datdemandeidt:string;
      matfisccheck:string;
      matfisc:string;
      adresse:string;
      employeur:string;
      empadresse:string;
      mariecheck:string;
      celibatairecheck:string;
      divorcecheck:string;
      veufcheck:string;
      conjoint:string;
      profconj:string;
      nombreenfants:string;
      revenusannuels:string;
      annualbonus:string;
      resident:string;
      nom:string;
      prenom:string;
      banquecheck:string;
      banquenomlocale:string;
      banquenometrangere:string;
      locatairecheck:string;
      proprietairecheck:string;
      pepcheck:string;
      pepmandat:string;
      riskclass:string;
      nationalitycheck:string;
      birth:string;
      lieunais:string;
      nationality:string;
      country:string;
      codepost:string;
      tel:string;
      emp:string;
      mineurcheck:string;
      majeurcheck:string;
      typeidt:string;
      legalexp:string;
      lieuemi:string;
      ppe:string;
      naturemandat:string;
      operinter:string;
      operinterpays:string;
      demspontcheck:string;
      recomtierscheck:string;
      initbnkcheck:string;
      recomcolabcheck:string;
      product:string;
      mntoperation:string;
      lucratif:string;
      sourcefonds:string;
      adrsiteweb:string;
      ressourcesass:string;
      industry:string;
      email1:string;
      numerojugement:string;
      datejorte:string;
      datecreate:string;
      codemand:string;
      town:string;
      dateeffet:string;
      formejurid:string;
      rccl:string;
      codedouane:string;
      codetva:string;
      codecadeg:string;
      fax:string;
      numetab:string;
      dateconstit:string;
      nom1:string;
      prenom1:string;
      lieunais1:string;
      typeidt1:string;
      cincheck1:string;
      passcheck1:string;
      cscheck1:string;
      birth1:string;
      datdemandeidt1:string;
      numidt1:string;
      legalexp1:string;
      lieuemi1:string;
      national1:string;
      nationalitycheck1:string;
      adresse1:string;
      code1POST:string;
      operinterpays1:string;
      tel1:string;
      fax1:string;
      emailm:string;
      sourcefonds1:string;
      nomprofession:string;
      nomsector:string;
      numidt2:string;
      nom2:string;
      nomprofession2:string;
      nomnational2:string;
      nomresidence2:string;
      numidt3:string;
      nom3:string;
      nomprofession3:string;
      nomnational3:string;
      nomresidence3:string;
      numidt4:string;
      nom4:string;
      nomprofession4:string;
      nomnational4:string;
      nomresidence4:string;
      numidt5:string;
      nom5:string;
      nomprofession5:string;
      nomnational5:string;
      nomresidence5:string;
      numidt6:string;
      nom6:string;
      nomprofession6:string;
      nomnational6:string;
      nomresidence6:string;
      numidt7:string;
      nom7:string;
      nomprofession7:string;
      nomnational7:string;
      nomresidence7:string;
      numidt8:string;
      nom8:string;
      nomprofession8:string;
      nomnational8:string;
      nomresidence8:string;
      numidt9:string;
      nom9:string;
      nomprofession9:string;
      nomnational9:string;
      nomresidence9:string;
      numidt10:string;
      nom10:string;
      nomprofession10:string;
      nomnational10:string;
      nomresidence10:string;
      nomprenclt:string;
      nomprenclt2:string;
      nomprenclt3:string;
      clt1LIEU:string;
      clt2LIEU:string;
      clt3LIEU:string;
      f1NOMPREN:string;
      f2NOMPREN:string;
      f3NOMPREN:string;
      f1LIEU:string;
      f2LIEU:string;
      f3LIEU:string;
      nomprenact1:string;
      nomprenact2:string;
      nomprenact3:string;
      typeidtact1:string;
      typeidtact2:string;
      typeidtact3:string;
      nymidtact1:string;
      nymidtact2:string;
      nymidtact3:string;
      capitalact1:string;
      capitalact2:string;
      capitalact3:string;
      paysact1:string;
      paysact2:string;
      paysact3:string;
      natact1:string;
      natact2:string;
      natact3:string;
      codesector:string;
      motivation:string;
      nomprenact4:string;
      typeidtact4:string;
      nymidtact4:string;
      capitalact4:string;
      paysact4:string;
      natact4:string;
      nomprenact5:string;
      typeidtact5:string;
      nymidtact5:string;
      capitalact5:string;
      paysact5:string;
      natact5:string;
      nomprenact6:string;
      typeidtact6:string;
      nymidtact6:string;
      capitalact6:string;
      paysact6:string;
      natact6:string;
      nomprenact7:string;
      typeidtact7:string;
      nymidtact7:string;
      capitalact7:string;
      paysact7:string;
      natact7:string;
      nomprenact8:string;
      typeidtact8:string;
      nymidtact8:string;
      capitalact8:string;
      paysact8:string;
      natact8:string;
      nomprenact9:string;
      typeidtact9:string;
      nymidtact9:string;
      capitalact9:string;
      paysact9:string;
      natact9:string;
      nomprenact10:string;
      typeidtact10:string;
      nymidtact10:string;
      capitalact10:string;
      paysact10:string;
      natact10:string;
      adresse2:string;
      tel2:string;
      fax2:string;
      adresse3:string;
      tel3:string;
      fax3:string;
      adresse4:string;
      tel4:string;
      fax4:string;
      adresse5:string;
      tel5:string;
      fax5:string;
      adresse6:string;
      tel6:string;
      fax6:string;
      adresse7:string;
      tel7:string;
      fax7:string;
      adresse8:string;
      tel8:string;
      fax8:string;
      adresse9:string;
      tel9:string;
      fax9:string;
      adresse10:string;
      tel10:string;
      fax10:string;
      idunique:string;
      benefeff:string;
      ppeact:string;
      chiffresaffa:string;
      residence1:string;
      lieunais2:string;
      birth2:string;
      lieunais3:string;
      birth3:string;
      lieunais4:string;
      birth4:string;
      lieunais5:string;
      birth5:string;
      lieunais6:string;
      birth6:string;
      lieunais7:string;
      birth7:string;
      lieunais8:string;
      birth8:string;
      lieunais9:string;
      birth9:string;
      lieunais10:string;
      birth10:string;
      
  constructor(private router: Router,private arpext1 : KYCService) { }
  data1;

  ngOnInit(): void 
  {
    this.show2=true;

  }
  extraireKYCPLC():void
  {
    this.showSpin=true;
    this.arpext1.ExtractPM(this.IdCustomer).subscribe(
      dataCus=>
          {            
console.log(dataCus)
            var succes =dataCus.value.status.successIndicator;
            this.ZERONORECORDS =dataCus.value.twskycpm2Type[0].zeronorecords;
            if (succes == "SUCCESS") { 
              if(this.ZERONORECORDS!="NO DATA"){  
this.datetoday=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].datetoday;
this.agence=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].agence;
this.cusid=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].cusid;
this.daterelation=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].daterelation;
this.salariecheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].salariecheck;
this.professionliberalcheck    =dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].professionliberalcheck;
this.prof=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].prof;
this.cincheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].cincheck;
this.passcheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].passcheck;
this.cscheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].cscheck;
this.numidt=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt;
this.datdemandeidt=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].datdemandeidt;
this.matfisccheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].matfisccheck;
this.matfisc=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].matfisc;
this.adresse=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse;
this.employeur=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].employeur;
this.empadresse=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].empadresse;
this.mariecheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].mariecheck;
this.celibatairecheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].celibatairecheck;
this.divorcecheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].divorcecheck;
this.veufcheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].veufcheck;
this.conjoint=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].conjoint;
this.profconj=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].profconj;
this.nombreenfants=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nombreenfants;
this.revenusannuels=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].revenusannuels;
this.annualbonus=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].annualbonus;
this.resident=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].resident;
this.nom=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom;
this.prenom=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].prenom;
this.banquecheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].banquecheck;
this.banquenomlocale=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].banquenomlocale;
this.banquenometrangere=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].banquenometrangere;
this.locatairecheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].locatairecheck;
this.proprietairecheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].proprietairecheck;
this.pepcheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].pepcheck;
this.pepmandat=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].pepmandat;
this.riskclass=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].riskclass;
this.nationalitycheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nationalitycheck;
this.birth=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth;
this.lieunais=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais;
this.nationality=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nationality;
this.country=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].country;
this.codepost=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].codepost;
this.tel=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel;
this.emp=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].emp;
this.mineurcheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].mineurcheck;
this.majeurcheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].majeurcheck;
this.typeidt=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidt;
this.legalexp=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].legalexp;
this.lieuemi=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieuemi;
this.ppe=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].ppe;
this.naturemandat=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].naturemandat;
this.operinter=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].operinter;
this.operinterpays=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].operinterpays;
this.demspontcheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].demspontcheck;
this.recomtierscheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].recomtierscheck;
this.initbnkcheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].initbnkcheck;
this.recomcolabcheck=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].recomcolabcheck;
this.product=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].product;
this.mntoperation=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].mntoperation;
this.lucratif=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lucratif;
this.sourcefonds=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].sourcefonds;
this.adrsiteweb=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adrsiteweb;
this.ressourcesass=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].ressourcesass;
this.industry=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].industry;
this.email1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].email1;
this.numerojugement=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numerojugement;
this.datejorte=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].datejorte;
this.datecreate=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].datecreate;
this.codemand=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].codemand;
this.town=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].town;
this.dateeffet=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].dateeffet;
this.formejurid=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].formejurid;
this.rccl=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].rccl;
this.codedouane=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].codedouane;
this.codetva=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].codetva;
this.codecadeg=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].codecadeg;
this.fax=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax;
this.numetab=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numetab;
this.dateconstit=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].dateconstit;
this.nom1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom1;
this.prenom1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].prenom1;
this.lieunais1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais1;
this.typeidt1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidt1;
this.cincheck1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].cincheck1;
this.passcheck1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].passcheck1;
this.cscheck1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].cscheck1;
this.birth1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth1;
this.datdemandeidt1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].datdemandeidt1;
this.numidt1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt1;
this.legalexp1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].legalexp1;
this.lieuemi1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieuemi1;
this.national1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].national1;
this.nationalitycheck1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nationalitycheck1;
this.adresse1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse1;
this.code1POST=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].code1POST;
this.operinterpays1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].operinterpays1;
this.tel1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel1;
this.fax1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax1;
this.emailm=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].emailm;
this.sourcefonds1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].sourcefonds1;
this.nomprofession=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession;
this.nomsector=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomsector;
this.numidt2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt2;
this.nom2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom2;
this.nomprofession2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession2;
this.nomnational2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational2;
this.nomresidence2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence2;
this.numidt3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt3;
this.nom3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom3;
this.nomprofession3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession3;
this.nomnational3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational3;
this.nomresidence3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence3;
this.numidt4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt4;
this.nom4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom4;
this.nomprofession4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession4;
this.nomnational4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational4;
this.nomresidence4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence4;
this.numidt5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt5;
this.nom5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom5;
this.nomprofession5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession5;
this.nomnational5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational5;
this.nomresidence5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence5;
this.numidt6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt6;
this.nom6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom6;
this.nomprofession6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession6;
this.nomnational6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational6;
this.nomresidence6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence6;
this.numidt7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt7;
this.nom7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom7;
this.nomprofession7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession7;
this.nomnational7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational7;
this.nomresidence7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence7;
this.numidt8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt8;
this.nom8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom8;
this.nomprofession8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession8;
this.nomnational8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational8;
this.nomresidence8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence8;
this.numidt9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt9;
this.nom9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom9;
this.nomprofession9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession9;
this.nomnational9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational9;
this.nomresidence9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence9;
this.numidt10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].numidt10;
this.nom10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nom10;
this.nomprofession10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprofession10;
this.nomnational10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomnational10;
this.nomresidence10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomresidence10;
this.nomprenclt=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenclt;
this.nomprenclt2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenclt2;
this.nomprenclt3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenclt3;
this.clt1LIEU=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].clt1LIEU;
this.clt2LIEU=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].clt2LIEU;
this.clt3LIEU=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].clt3LIEU;
this.f1NOMPREN=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].f1NOMPREN;
this.f2NOMPREN=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].f2NOMPREN;
this.f3NOMPREN=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].f3NOMPREN;
this.f1LIEU=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].f1LIEU;
this.f2LIEU=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].f2LIEU;
this.f3LIEU=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].f3LIEU;
this.nomprenact1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact1;
this.nomprenact2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact2;
this.nomprenact3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact3;
this.typeidtact1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact1;
this.typeidtact2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact2;
this.typeidtact3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact3;
this.nymidtact1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact1;
this.nymidtact2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact2;
this.nymidtact3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact3;
this.capitalact1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact1;
this.capitalact2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact2;
this.capitalact3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact3;
this.paysact1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact1;
this.paysact2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact2;
this.paysact3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact3;
this.natact1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact1;
this.natact2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact2;
this.natact3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact3;
this.codesector=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].codesector;
this.motivation=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].motivation;
this.nomprenact4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact4;
this.typeidtact4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact4;
this.nymidtact4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact4;
this.capitalact4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact4;
this.paysact4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact4;
this.natact4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact4;
this.nomprenact5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact5;
this.typeidtact5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact5;
this.nymidtact5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact5;
this.capitalact5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact5;
this.paysact5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact5;
this.natact5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact5;
this.nomprenact6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact6;
this.typeidtact6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact6;
this.nymidtact6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact6;
this.capitalact6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact6;
this.paysact6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact6;
this.natact6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact6;
this.nomprenact7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact7;
this.typeidtact7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact7;
this.nymidtact7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact7;
this.capitalact7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact7;
this.paysact7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact7;
this.natact7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact7;
this.nomprenact8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact8;
this.typeidtact8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact8;
this.nymidtact8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact8;
this.capitalact8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact8;
this.paysact8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact8;
this.natact8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact8;
this.nomprenact9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact9;
this.typeidtact9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact9;
this.nymidtact9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact9;
this.capitalact9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact9;
this.paysact9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact9;
this.natact9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact9;
this.nomprenact10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nomprenact10;
this.typeidtact10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].typeidtact10;
this.nymidtact10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].nymidtact10;
this.capitalact10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].capitalact10;
this.paysact10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].paysact10;
this.natact10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].natact10;
this.adresse2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse2;
this.tel2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel2;
this.fax2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax2;
this.adresse3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse3;
this.tel3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel3;
this.fax3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax3;
this.adresse4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse4;
this.tel4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel4;
this.fax4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax4;
this.adresse5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse5;
this.tel5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel5;
this.fax5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax5;
this.adresse6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse6;
this.tel6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel6;
this.fax6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax6;
this.adresse7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse7;
this.tel7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel7;
this.fax7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax7;
this.adresse8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse8;
this.tel8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel8;
this.fax8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax8;
this.adresse9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse9;
this.tel9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel9;
this.fax9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax9;
this.adresse10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].adresse10; 
this.tel10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].tel10; 
this.fax10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].fax10;
this.idunique=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].idunique;
this.benefeff=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].benefeff;
this.ppeact=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].ppeact;
this.chiffresaffa=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].chiffresaffa;
this.residence1=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].residence1;
this.lieunais2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais2;
this.birth2=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth2;
this.lieunais3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais3;
this.birth3=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth3;
this.lieunais4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais4;
this.birth4=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth4;
this.lieunais5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais5;
this.birth5=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth5;
this.lieunais6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais6;
this.birth6=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth6;
this.lieunais7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais7;
this.birth7=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth7;
this.lieunais8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais8;
this.birth8=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth8;
this.lieunais9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais9;
this.birth9=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth9;
this.lieunais10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].lieunais10;
this.birth10=dataCus.value.twskycpm2Type[0].gtwskycpm2DetailType.mtwskycpm2DetailType[0].birth10;
setTimeout(() => { 
  this.tab.push(
    {
      champ:"Code Client",
      name: this.IdCustomer.toString(),
    },
    
    {
      champ:"Nom et Prenom",
      name: this.nom.toString()
    },
    {
      champ:"Agence",
      name: this.agence.toString()
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
    doc.setFontType("bold");
    doc.setFontSize(14);
    doc.text("Fiche KYC –Profession Libérale/Commerçante ",50, 30 );

    
    doc.setFontSize(10);
    doc.text("Agence",15, 50 );doc.text(" : ",60, 50 );doc.text(this.agence,80, 50 );
    doc.text("Code client",15, 60 );doc.text(" : ",60, 60 );doc.text(this.IdCustomer,80, 60 );
    doc.text("Date d’entrée en relation",15, 70 );doc.text(" : ",60, 70 );doc.text(this.daterelation,80, 70 );
    doc.setFontSize(12);
    doc.setFontType("bold");

    doc.text("1. INFORMATIONS GENERALES SUR LE CLIENT",15, 90 );
    doc.line(15, 91, 115, 91);
    doc.setFontSize(12);
    doc.setFontType("normal");
    if (this.resident=="O")
    {
      doc.text("X",60, 102 );
    }
    else
    {
      doc.text("X",120, 102 );

    }
    doc.text("Client Résident  : ",15, 102 ); doc.rect(60, 99, 3, 3) ;doc.text("Oui", 65, 102); doc.rect(120, 99, 3, 3);doc.text("Non", 125, 102);

    doc.text("Dénomination:",15, 112 );doc.text(this.nom,50,112 );
    doc.text("Lieu de création :",15, 120 );doc.text(this.town,50, 120 );doc.text("Date de création:",100, 120 );doc.text(this.dateeffet,140, 120 );
    doc.text("Nationalité:",15, 128 );doc.text(this.nationality,50, 128 );

    doc.text("Rue:",15, 136 );doc.text(this.adresse,50, 136 );
    doc.text("Code Postal:",15, 144 );doc.text(this.codepost,50, 144 );doc.text("Pays:",95, 144 );doc.text(this.country,120, 144 )
   doc.text("Tél/ GSM: ",15, 152 ); doc.text(this.tel,50, 152 );doc.text("Fax: ",95, 152 );doc.text(this.fax,130, 152 )
   doc.text("E-Mail: ",15, 160 );doc.text(this.email1,50, 160 );
   doc.text("Mat. Fisc: ",15, 168 );   doc.text(this.matfisc,50, 168 );


   doc.setFontSize(9);
   doc.setFontType("bold");

   doc.text("DONNEES PERSONNELLES DU MANDATAIRE :",15, 180 );
   doc.text("Prénom Nom*",20, 195 );
   var strArr = doc.splitTextToSize("Date et lieu de naissance", 30)
doc.text(strArr, 60, 195);
   var strArr = doc.splitTextToSize("Type et numéro Identité", 30)
   doc.text(strArr, 90, 195);

   doc.text("Nationalité",120, 195 );
   doc.text("Résidence",160, 195 );

   doc.text(this.prenom1,20, 210 );
   doc.text(this.nom1,20, 214 );

   doc.text(this.lieunais1,60, 210 );
   doc.text(this.birth1,60, 214 );

   doc.text(this.typeidt1,90, 210 );
   doc.text(this.numidt1,90, 214 );

   doc.text(this.national1,125, 210 );

   doc.text(this.residence1,150, 210 );


   doc.text(this.nom2,20, 235 );

   doc.text(this.lieunais2,60, 235 );
   doc.text(this.birth2,60, 239 );

   //doc.text(this.TYPEIDT2,90, 210 );
   doc.text(this.numidt2,90, 235 );

   doc.text(this.nomnational2,125, 235 );

   doc.text(this.nomresidence2,150, 235 );



   doc.text(this.nom3,20, 260 );

   doc.text(this.lieunais3,60, 260 );
   doc.text(this.birth3,60, 264 );

   //doc.text(this.TYPEIDT2,90, 210 );
   doc.text(this.numidt3,90, 260 );

   doc.text(this.nomnational3,125, 260 );

   doc.text(this.nomresidence3,150, 260 );



   
   doc.text(this.nom4,20, 285 );

   doc.text(this.lieunais4,60, 285 );
   doc.text(this.birth4,60, 289 );

   //doc.text(this.TYPEIDT2,90, 210 );
   doc.text(this.numidt4,90, 285 );

   doc.text(this.nomnational4,125, 285 );

   doc.text(this.nomresidence4,150, 285 );




   doc.rect(15, 190, 180, 100);
   doc.rect(15, 205, 180, 85);
   doc.rect(15, 190, 40, 100);
   doc.rect(15, 190, 70, 100);
   doc.rect(15, 190, 100, 100);
   doc.rect(15, 190, 130, 100);


  /*                        second Page                      */
doc.addPage();
doc.rect(4, 4, 200, 290)

doc.addImage(this.imgdata, 'PNG', 10, 15, 25, 10);
doc.rect(15, 30, 180, 80);
  doc.rect(15, 30, 40, 80);
   doc.rect(15, 30, 70, 80);
   doc.rect(15, 30, 100, 80);
   doc.rect(15, 30, 130, 80);


   doc.text(this.nom5,20, 45 );

   doc.text(this.lieunais5,60, 45 );
   doc.text(this.birth5,60, 289 );

   //doc.text(this.TYPEIDT2,90, 210 );
   doc.text(this.numidt5,90, 45 );

   doc.text(this.nomnational5,125, 45 );

   doc.text(this.nomresidence5,150, 45 );
doc.text("Paraphe client ",170, 120 );



doc.setFontSize(11);
doc.setFontType("bold");
doc.text("REVENUS : ",15, 148 )
doc.setFontSize(12);
doc.setFontType("normal");

doc.text("Salaires / Revenus annuels :  ",15, 160 );doc.text(this.revenusannuels,60, 160 );
if (this.banquecheck=="O") 
{
  doc.text("X",95, 166 );
}
else
{
  doc.text("X",135, 166 );
}
doc.text("Bancarisé:",15, 166 ); doc.rect(95, 163, 3, 3);  doc.text("Oui",100, 166 ) ;doc.rect(135, 163, 3, 3);  doc.text("Non",140, 166 ) 
doc.text("Banques locales :",15, 172 );doc.text(this.banquenomlocale,70, 172 );

doc.text("Banques Etrangères :",15, 178 );doc.text(this.banquenometrangere,70, 178 );
if (this.ppe=="O") 
{
  doc.text("X",155, 184 )
  
}
if (this.ppe=="N") 
{
  doc.text("X",175, 184 )

}
doc.text("Personne physique est-elle une Personne politiquement exposée PPE* :  ",15, 184 ); doc.rect(155, 181, 3, 3);  doc.text("Oui",160, 184 ) ;doc.rect(175, 181, 3, 3);  doc.text("Non",180, 184 ) 
doc.text("Si oui, préciser la nature du mandat: ",15, 192 );


doc.setFontType("bold");

doc.text(" 2. CIRCONSTANCES DE L’ENTREE EN RELATION:",15, 200 );
doc.setFontType("normal");
doc.setLineWidth(0);
doc.line(15, 201, 120, 201);
doc.setLineWidth(0);
if (this.demspontcheck=="O") 
{
  doc.text("X",15, 210 )
}
if (this.recomtierscheck=="O") 
{
  doc.text("X",105, 210 ) 
}
if (this.initbnkcheck=="O") 
{
  doc.text("X",15, 218 )
}
if (this.recomcolabcheck=="O") 
{
  doc.text("X",105, 218 )
}

; doc.rect(15, 207, 3, 3);  doc.text("Démarche spontanée ",20, 210 ) 
; doc.rect(105, 207, 3, 3);  doc.text("Recommandation d'un tiers ",110, 210 ) 
; doc.rect(15, 215, 3, 3);  doc.text("Initiative de la banque",20, 218 ) 
; doc.rect(105, 215, 3, 3);  doc.text("Recommandation d'un",110, 218 ) 


doc.text(" Principales motivations de l’ouverture du compte : ",15, 228 );
doc.text(this.motivation,20, 234 );
doc.rect(15, 230, 180, 10);
doc.setFontSize(14);


doc.setFontSize(11);
doc.setFontType("bold");
doc.text("FONCTIONNEMENT ATTENDU DU COMPTE :",15, 248 );

doc.setFontSize(12);
doc.setFontType("normal");
doc.text("type des opérations :  ",15, 256 );doc.text(this.product,50, 256 );

doc.text("Montants des opérations  :  ",15, 264 )


if (this.mntoperation=="1 - 10 000") 
{
  doc.text("X",15, 276 ) 
}  
if (this.mntoperation=="10 000 - 50 000") 
{
  doc.text("X",45, 276 ) 
}
if (this.mntoperation=="50 000 - 100 000") 
{
  doc.text("X",95, 276 ) 
} 
if (this.mntoperation=="100 000 - 500 000") 
{
  doc.text("X",135, 276 ) 
}
if (this.mntoperation==">= 500 000") 
{
  doc.text("X",175, 276 ) 
}
; doc.rect(15, 273, 3, 3);  doc.text("1-10 000 ",20, 276 ) 
; doc.rect(45, 273, 3, 3);  doc.text("10 000-50 000 ",50, 276 ) 
; doc.rect(95, 273, 3, 3);  doc.text("50 000-100 000 ",100, 276 ) 
; doc.rect(135, 273, 3, 3);  doc.text("100 000-500 000",140, 276 ) 
; doc.rect(175, 273, 3, 3);  doc.text(">=500 000 ",180, 276 ) 

  /*                        3rd Page                      */
  doc.addPage();
  doc.rect(4, 4, 200, 290)

  doc.addImage(this.imgdata, 'PNG', 10, 15, 25, 10);
  doc.setFontSize(12);
  doc.text("Opérations internationales envisagées  :  ",15, 35 );
  doc.text(this.operinterpays,16,46)
   if (this.operinter=="O")
   {
      doc.text("X",135, 35 );
   }
   if (this.operinter=="N") 
   {
      doc.text("X",95, 35 );
   }
   doc.text("Non",100, 35 ) 
   doc.rect(95, 32, 3, 3); 
  ; doc.rect(135, 32, 3, 3);  doc.text("Oui, avec quel(s) pays ? ",140, 35 ) 
 
  doc.rect(15, 42, 180, 10);
  doc.setFontType("bold");
  doc.text("Paraphe client ",170, 60 );

  doc.setFontSize(8);
  doc.setFontType("bold");

  doc.text("(*)Personnes Politiquement Exposées (PPE ou « Politically Exposed Persons PEP) :",15, 80 );
  doc.text("L’expression personnes politiquement exposées (PPE), désigne les personnes physiques qui exercent ou ont exercé ",15, 90 );
  doc.text("en Tunisie ou dans un pays étranger, d'importantes fonctions publiques ou des missions représentatives ou ",15, 94 );
  doc.text("politiques ",15, 98 );



  doc.setFontSize(10);
  doc.setFontType("bold");


  
doc.text("3. LOI FATCA",15, 106 );
doc.setFontType("normal");
doc.setLineWidth(0);
doc.line(15, 107, 40, 107);
doc.setLineWidth(0);

doc.text("La relation répond-elle aux critères d’américanité (Loi FATCA) ?  ",15, 114 );
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











doc.setFontType("bold");
doc.text("-Engagement Du Client",85, 206 );
doc.text("Je soussigné(e)….......",15, 214 );

doc.setFontSize(12);
doc.setFontType("normal");
doc.text("Avez-vous d’autres bénéficiaires effectifs ?",15, 220 );doc.rect(145, 217, 3, 3);  doc.text("Oui",150, 220 ) ;doc.rect(175, 217, 3, 3);  doc.text("Non",180, 220 )

doc.rect(15, 224, 180, 10);

doc.text("Avez-vous autres personnes politiquement exposées à signaler ? ",15, 240 );doc.rect(145, 237, 3, 3);  doc.text("Oui",150, 240 ) ;doc.rect(175, 237, 3, 3);  doc.text("Non",180, 240 )
doc.rect(15, 244, 180, 10);


  /*                        4rd Page                      */
  doc.addPage();
  doc.rect(4, 4, 200, 290)

  doc.addImage(this.imgdata, 'PNG', 10, 15, 25, 10);

  doc.rect(15, 37, 3, 3);  doc.text("Atteste que les informations fournies dans ci-dessus sont conformes et correctes.",20, 40 ) 
doc.rect(15, 43, 3, 3);  doc.text("Changement d’adresse ou toute information d’identification.",20, 46 ) 

doc.text("Fait le ….......à………",77, 56 ) 
doc.text("Lu et approuvé",82, 68 ) 
doc.setFontSize(12);
doc.setFontType("bold");
doc.text("Signature",85, 76 ) 

    window.open(doc.output('bloburl'), '_blank');

  }
}

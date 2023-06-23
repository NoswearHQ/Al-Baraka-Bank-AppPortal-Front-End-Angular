import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {LoginT24Service} from './login-t24.service'
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {enableProdMode} from '@angular/core';  
import { AuthGuard } from './_helpers/auth_guard';
import { Annex11Component } from './annex11/annex11.component';
import { AnrComponent } from './anr/anr.component';
import { ArpComponent } from './arp/arp.component';
import { ChequereturnedComponent } from './chequereturned/chequereturned.component';
import { CnpComponent } from './cnp/cnp.component';
import { KycComponent } from './kyc/kyc.component';
import { KycassComponent } from './kycass/kycass.component';
import { KycpldComponent } from './kycpld/kycpld.component';
import { KycpmComponent } from './kycpm/kycpm.component';
import { KycppComponent } from './kycpp/kycpp.component';
import { LdcComponent } from './ldc/ldc.component';
import { MenuComponent } from './menu/menu.component';
import { PrevComponent } from './prev/prev.component';
import { PreveComponent } from './preve/preve.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { PrevCPTCPTComponent } from './prev-cptcpt/prev-cptcpt.component';
//import { MatProgressSpinnerModule } from '@angular/material/badge';

/*const MaterialComponents ={
  MatProgressSpinnerModule
};*/



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    Annex11Component,
    AnrComponent,
    ArpComponent,
    ChequereturnedComponent,
    CnpComponent,
    KycComponent,
    KycassComponent,
    KycpldComponent,
    KycpmComponent,
    KycppComponent,
    LdcComponent,
    MenuComponent,
    PrevComponent,
    PreveComponent,
    FooterComponent,
    PrevCPTCPTComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path:'', component: LoginComponent },
      { path:'menu', component: MenuComponent, canActivate: [AuthGuard] },
      { path: 'CHEQUERETURNED', component: ChequereturnedComponent, canActivate: [AuthGuard] },
      { path: 'KYC', component: KycComponent, canActivate: [AuthGuard] },
      { path: 'prev', component: PrevComponent, canActivate: [AuthGuard] },


      { path: 'CHEQUERETURNED/CNP', component: CnpComponent, canActivate: [AuthGuard] },
      { path: 'CHEQUERETURNED/ANR', component: AnrComponent, canActivate: [AuthGuard] },
      { path: 'CHEQUERETURNED/ARP', component: ArpComponent, canActivate: [AuthGuard] },
      { path: 'CHEQUERETURNED/Annex11', component: Annex11Component, canActivate: [AuthGuard] },

      { path: 'KYC/PP', component: KycppComponent, canActivate: [AuthGuard] },
      { path: 'KYC/PM', component: KycpmComponent, canActivate: [AuthGuard] },
      { path: 'KYC/ASS', component: KycassComponent, canActivate: [AuthGuard] },
      { path: 'KYC/PLC', component: KycpldComponent, canActivate: [AuthGuard] },

      { path: 'prev/LDC', component: LdcComponent, canActivate: [AuthGuard] },
      { path: 'prev/PREVE', component: PreveComponent, canActivate: [AuthGuard] },
      { path: 'prev/PREVEcpt', component: PrevCPTCPTComponent, canActivate: [AuthGuard] }
   //   { path:'**', component: PageNotFoundComponent }


    ]),
    BrowserAnimationsModule

    


  ],
  
  providers: [LoginT24Service],
  bootstrap: [AppComponent]
})
export class AppModule { }

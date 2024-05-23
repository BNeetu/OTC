import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule , NgxUiLoaderHttpModule} from "ngx-ui-loader";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterModule} from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HeaderInterceptor } from './header.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    RecaptchaV3Module,
    RouterModule,
    NgApexchartsModule,
    NgxPaginationModule,
    

    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    })
    
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
    {provide: HTTP_INTERCEPTORS,useClass:HeaderInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

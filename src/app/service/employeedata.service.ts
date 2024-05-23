import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
import { ApiMethod, AuthEndPoints } from '../constant/ApiMethod';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeedataService {
  response:any;

  constructor(private http:HttpClient) { }




  requestCall(
    api: any,
    method: ApiMethod,
    data?: any
  ): Observable<any> {
  
   switch (method) {
      case ApiMethod.GET:
        if(data!=''){
        this.response = this.http
          .get(environment.BaseUrl + api)
          .pipe(catchError((error) => this.handleError(error)));
        }
        break;
      case ApiMethod.POST:
        this.response = this.http
          .post(environment.BaseUrl + api, data)
          .pipe(catchError((error) => this.handleError(error)));
        break;
      default:
        break;
    }

    return this.response;
    
    }
  handleError(error: any): any {
    throw new Error('Method not implemented.');
  }


  
  



  }
  // fetchUserCat(data: any){
  //   return this.http.post("https://dev-api.newage.market/platform/api/usercategories",data)
  // }

  // fetchSubMembersCat(data: any){
  //   return this.http.post("https://dev-api.newage.market/platform/api/usersubcategories",data)
  // }






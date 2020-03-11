import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AppServiceService {
  private api = "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io";
  constructor(private http: HttpClient) {

   }

   getCommunity()
   {
    
     return this.http.get(this.api+"/communities");

   }

   getHome()
   {
     return this.http.get(this.api+"/homes");
   }

}

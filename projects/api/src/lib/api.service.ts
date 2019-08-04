import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = 'http://www.server.com/api/';

  constructor(private httpClient: HttpClient) { }

  public post() {
    
  }
  public delete(id:number) {
    
  }
  public put(id:number){
  
}
  public get(get:number){
  
  }
}

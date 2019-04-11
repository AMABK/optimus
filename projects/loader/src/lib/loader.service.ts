import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject(true);
  setLoading(arg0: boolean) {
    this.isLoading.next(arg0);

  }

  // A BehaviorSubject is an Observable with a default value


  constructor() { }
}

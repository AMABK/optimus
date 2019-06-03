import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  setLoading(arg0: boolean) {
    this.isLoading.next(arg0);
  }
  constructor() { }
}

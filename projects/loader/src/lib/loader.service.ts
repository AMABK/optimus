import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  setLoading(arg0: boolean) {
    this.isLoading.next(false);
  }
  constructor() { }
  ngOnDestroy(): void {
    this.isLoading.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}

import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit,OnDestroy {
  parentState: boolean = false;
  status = 0;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy() {
    
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.status=tabChangeEvent.index;
  }
}

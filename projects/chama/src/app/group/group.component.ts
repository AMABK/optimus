import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  status = 0;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  constructor() { }

  ngOnInit() {
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if ('Group Suspended Members' == tabChangeEvent.tab.textLabel) {
      this.status = 1;
    } else {
      this.status = 0;
    }
    console.log(this.status)
  }
}

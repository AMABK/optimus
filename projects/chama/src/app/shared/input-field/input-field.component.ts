import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.css"]
})
export class InputFieldComponent implements OnInit, OnChanges {
  background;
  @Input() formValue = "";
  @Input() autoComplete: any;
  @Input() imageName: string;
  @Input() placeHolder: string;
  @Input() type: string;
  @Input() controlName: FormControl;

  constructor(protected sanitizer: DomSanitizer) {}

  ngOnChanges(changes) {
    const ll =
      "url(../../assets/icons/" +
      this.imageName +
      ") no-repeat scroll 10px 10px";
    this.background = this.sanitizer.bypassSecurityTrustStyle(ll);
  }

  ngOnInit() {}
}

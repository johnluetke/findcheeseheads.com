import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decode'
})
export class DecodePipe implements PipeTransform {

  private txt: HTMLTextAreaElement;

  constructor() {
    this.txt = document.createElement("textarea");
  }

  transform(value: any, args?: any): any {
    this.txt.innerHTML = value;
    return this.txt.value;
  }

}

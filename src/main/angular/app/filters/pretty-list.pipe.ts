import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyList'
})
export class PrettyListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value instanceof Array) {
      let str: string = "";
      if (value.length == 1) {
        return value;
      }
      
      value.forEach(function(val: string, i: number) {
        if (i + 2 < value.length) {
          str += val + ", ";
        }
        else if ((i + 1) < value.length) {
          str += val + " ";
        }
        else {
          str += "and " + val;
        }
      });

      return str;
    }
    else {
      return value;
    }
  }
}

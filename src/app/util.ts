export class Util {
  static parse(value: any, dflt: any) {
    if (value == undefined) {
      return dflt;
    }
    else {
      return value;
    }
  }
}

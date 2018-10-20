import { Util } from '../util';
import { Report } from './report';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IVenue {
  address: string;
  id: number;
  last_updated: Date;
  lat: number;
  lng: number;
  location: ICoordinates;
  name: string;
  pending: boolean;
  reports: Report[];
}

export class Coordinates implements ICoordinates {
  public lat = 0;
  public lng = 0;

  public constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

export class Venue implements IVenue {

  public address: string = null;
  public id: number = null;
  public last_updated: Date = new Date();
  public lat: number = null;
  public lng: number = null;
  public location: Coordinates = null;
  public name: string = null;
  public pending: boolean = null;
  public reports: Report[] = [];
  public static createFromArray(objs : any[]) : Venue[] {
    const results : Venue[] = [];
    for (const i in objs) {
      results.push(Venue.create(objs[i]));
    }

    return results;
  }

  public static create(obj : any) : Venue {
    const venue : Venue = new Venue();
    venue.address = obj['address'];
    venue.id = obj['id'];
    venue.last_updated = obj['last_updated'];
    venue.lat = obj['lat'];
    venue.lng = obj['lng'];
    venue.name = obj['name'];
    venue.pending = obj['pending'];
    venue.reports = Util.parse(obj['reports'], []);
    return venue;
  }

  public getReportCount(): number {
    let count = 0;
    this.reports.forEach(function(report) {
      count += report.count;
    });
    return count;
  }
}

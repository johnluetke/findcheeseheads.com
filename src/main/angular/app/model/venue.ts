import { Util } from '../util'

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IReport {
  type: string;
  count: number;
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
  reports: IReport[];
}

export interface IVenueReportSubmission {
  venueId: number;
  reason: string;
  other: string;
}

export class Coordinates implements ICoordinates {
  lat: number = 0;
  lng: number = 0;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

export class Report implements IReport {
  type: string = null;
  count: number = undefined;
}

export class Venue implements IVenue {
  static createFromArray(objs : any[]) : Venue[] {
    let results : Venue[] = [];
    for (let i in objs) {
      results.push(Venue.create(objs[i]));
    }

    return results;
  }

  static create(obj : any) : Venue {
    let venue : Venue = new Venue();
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

  address: string = null;
  id: number = null;
  last_updated: Date = new Date();
  lat: number = null;
  lng: number = null;
  location: Coordinates = null;
  name: string = null;
  pending: boolean = null;
  reports: Report[] = [];

  getReportCount(): number {
    let count = 0;
    this.reports.forEach(function(report) {
      count += report.count;
    });
    return count;
  }
}

export class VenueReportSubmission implements IVenueReportSubmission {
  venueId: number = null;
  reason: string = null;
  other: string = null;
}

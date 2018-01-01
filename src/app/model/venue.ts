import { Util } from '../util'

export interface IReport {
  reports: IReportType;
  count: number;
}

export interface IReportType {
  type: string;
  count: number;
}

export interface IVenue {
  address: string;
  id: number;
  last_updated: Date;
  lat: number;
  lng: number;
  name: string;
  pending: boolean;
  reports: IReport[];
}

export interface IVenueReportSubmission {
  id: number;
  reason: string;
  other: string;
}


export class Report implements IReport {
  constructor() {
  }
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
    venue.last_updated = obj['last_updated']
    venue.lat = obj['lat']
    venue.lng = obj['lng']
    venue.name = obj['name'];
    venue.pending = obj['pending'];
    venue.reports = Util.parse(obj['reports'], []]);
    return venue;
  }

  constructor() {
    this.reports = [];
  }

  getReportCount(): number {
    let count = 0;
    this.reports.forEach(function(report) {
      count += report.count;
    });
    return count;
  }
}

export class VenueReportSubmission implements IVenueReportSubmission {

}

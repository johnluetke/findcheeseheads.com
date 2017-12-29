import { Util } from './util'

export interface ICountry {
  code: string;
  name: string;
}

export interface IReport {
  reports: IReportType;
  count: number;
}

export interface IReportType {
  closed: number;
  not_packer_par: number;
}

export interface ISearchCriteria {
  query: string;
  country: ICountry;
}

export interface ISearchResults {
  cities: string[];
  results: IVenue[];
}

export interface IVenue {
  address: string;
  id: number;
  last_updated: Date;
  lat: number;
  lng: number;
  name: string;
  pending: boolean;
  reports: IReport;
}

export interface IVenueReportSubmission {
  id: number;
  reason: string;
  other: string;
}

export class Country implements ICountry {

}

export class Report implements IReport {
  constructor() {
    this.count = 0;
  }
}

export class SearchCriteria implements ISearchCriteria {
  constructor() {
    this.query = null;
    this.country = new Country();
  }

  hasCriteria(): boolean {
    return this.query != null && this.query.length > 0 &&
           this.country != null && this.country.code != null && this.country.code.length > 0;
  }
}

export class SearchResults extends SearchCriteria implements ISearchResults {
  constructor() {
    super();
    this.cities = [];
    this.venues = [];
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
    venue.reports = Util.parse(obj['reports'], new Report());
    return venue;
  }

  constructor() {
    this.reports = new Report();
  }
}


export class
VenueReportSubmission implements IVenueReportSubmission {

}

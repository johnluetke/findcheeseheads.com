import { Util } from '../util'
import { IVenue, Venue } from './venue';

export interface ICountry {
  code: string;
  name: string;
}

export interface ISearchResults {
  cities: string[];
  venues: IVenue[];
}

export class Country implements ICountry {
  code: string = null;
  name: string = null;
}

export class SearchCriteria {
  criteria: string = null;
  distance: number = null;
  units: string = null;

  hasCriteria(): boolean {
    return this.criteria != null && this.criteria.length > 0 &&
           this.distance != null && this.distance > 0 &&
           this.units != null && this.units.length > 0;
  }
}

export class SearchResults extends SearchCriteria implements ISearchResults {
  cities: string[] = [];
  venues: Venue[] = [];

  constructor() {
    super();
  }
}

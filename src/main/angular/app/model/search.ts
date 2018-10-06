import { Util } from '../util'
import { IVenue, Venue } from './venue';

export interface ICountry {
  code: string;
  name: string;
}

export interface ISearchCriteria {
  query: string;
  country: ICountry;
}

export interface ISearchResults {
  cities: string[];
  venues: IVenue[];
}

export class Country implements ICountry {
  code: string = null;
  name: string = null;
}

export class SearchCriteria implements ISearchCriteria {
  query: string = null;
  country: Country = new Country();

  hasCriteria(): boolean {
    return this.query != null && this.query.length > 0 &&
           this.country != null && this.country.code != null && this.country.code.length > 0;
  }
}

export class SearchResults extends SearchCriteria implements ISearchResults {
  cities: string[] = [];
  venues: Venue[] = [];

  constructor() {
    super();
  }
}

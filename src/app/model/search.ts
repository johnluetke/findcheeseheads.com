import { Util } from '../util'

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
  results: IVenue[];
}

export class Country implements ICountry {
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

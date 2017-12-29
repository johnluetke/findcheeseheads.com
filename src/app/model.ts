export interface Country {
  code: string;
}

export interface SearchCriteria {
  query: string;
  country: Country;
}

export class Report {
  public type: string = null;
  public count: number = undefined;
}

export class ReportMessage {
  public venueId: number;
  public success = false;
  public message: string;
}

export class ReportSubmission {
  public venueId: number = null;
  public reason: string = null;
  public other: string = null;
}
  

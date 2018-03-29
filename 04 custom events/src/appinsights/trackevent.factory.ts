import { AppInsights } from 'applicationinsights-js'

export class TrackEventService {


  constructor() {      
  }

  public trackEvent(name : string, properties?, measurements?) {
    AppInsights.trackEvent(name, properties, measurements);
  }
}

TrackEventService.$inject = [];


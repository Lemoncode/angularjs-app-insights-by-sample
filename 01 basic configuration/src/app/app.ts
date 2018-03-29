import * as angular from 'angular';
import { routing } from './app.routes'
import {AppComponent} from './app.component';
import { components } from './components'
import { AppInsights } from 'applicationinsights-js'

 /* Call downloadAndSetup to download full ApplicationInsights script from CDN and initialize it with  instrumentation key */
AppInsights.downloadAndSetup({ 
    instrumentationKey: "<YOUR INSTRUMENTATION KEY HERE>",
    // Limit number of Ajax calls logged, to reduce traffic.
      maxAjaxCallsPerView: 10, // default is 500 
  });

AppInsights.trackPageView();


angular.module('app', [
    'ui.router',
    components.name
  ])
  .config(routing)
  .component('app', AppComponent)
;

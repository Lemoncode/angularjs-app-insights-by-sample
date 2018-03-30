# 06 Angular Tics 

In this project we will configure app-insights basics and check some metrics (no specific angularjs
support so far).


## Prerequisites

You will need node (at least v. 8.11.0) installed: https://nodejs.org/en/

## Steps

- Let's start from our the sample _01 Basic config_ let's copy the content from that folder.

- First you need to install all the depdencies, open your command prompt and execute an _npm install_.

```bash
npm install
```

- Now let's start our fake server:

```bash
npm run api:fake
```

- Let's install angulartics

```bash
npm install angulartics --save
```

```bash
npm install @types/angulartics --save-dev
```
- Let's add angulartics dependency into webpack config.

_./webpack.config.js_

```diff
  entry: {
    app: './app/app.ts',
    vendor: [
      'angular',  
      'angular-toastr',       
      '@uirouter/angularjs',
      'angular-messages',
+      'angular-tics', 
    ],    

```

- Let's create an _angulartics-azure.ts_ under a new folder called _appinsights_

_./src/appinsights/angulartics-azure.ts_

```javascript
import * as angular from 'angular';

/**
 * @license Angulartics v0.17.2
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Microsoft Azure Application Insights plugin contributed by https://github.com/anthonychu
 * License: MIT
 */

export const angularticsAzure = angular.module('angulartics.azure', ['angulartics'])
  .config(['$analyticsProvider', function ($analyticsProvider) {

    $analyticsProvider.registerPageTrack(function (path) {
      appInsights.trackPageView(path);
    });

		/**
		 * Numeric properties are sent as metric (measurement) properties.
		 * Everything else is sent as normal properties.
		 */
    $analyticsProvider.registerEventTrack(function (eventName, eventProperties) {
      var properties = {};
      var measurements = {};

      angular.forEach(eventProperties, function (value, key) {
        if (isNumeric(value)) {
          measurements[key] = parseFloat(value);
        } else {
          properties[key] = value;
        }
      });

      appInsights.trackEvent(eventName, properties, measurements);
    });

  }]);

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```

- Let's import this module into our main app.

_./src/app/app.ts_

```diff
import * as angular from 'angular';
import { routing } from './app.routes'
import {AppComponent} from './app.component';
import { components } from './components'
import { AppInsights } from 'applicationinsights-js'
+ import { angularticsAzure } from '../appinsights/angulartics-azure';


 /* Call downloadAndSetup to download full ApplicationInsights script from CDN and initialize it with  instrumentation key */
AppInsights.downloadAndSetup({ 
    instrumentationKey: "<YOUR INSTRUMENTATION KEY HERE>",
    // Limit number of Ajax calls logged, to reduce traffic.
      maxAjaxCallsPerView: 10, // default is 500 
  });

AppInsights.trackPageView();


angular.module('app', [
    'ui.router',
+    angularticsAzure.name,    
    components.name
  ])
  .config(routing)
  .component('app', AppComponent)
;
```

- Let's check if we get things working:

```
npm start
```
# 00 Basic config

In this project we will configure app-insights basics and check some metrics (no specific angularjs
support so far).


## Prerequisites

You will need node (at least v. 8.11.0) installed: https://nodejs.org/en/

## Steps

- Let's start from our previous sample _00 Startup_ let's copy the content from that folder.

- First you need to install all the depdencies, open your command prompt and execute an _npm install_.

```bash
npm install
```

- Now it's time to install app-insight javascript official SDK and it's corresponding typings:

```cmd
npm install applicationinsights-js --save
```

```cmd
npm install @types/applicationinsights-js --save
``` 

- We need to add startup code to our application, we will need to provide our app insight
instrumentation key (more info about this: https://docs.microsoft.com/en-us/azure/application-insights/app-insights-javascript).

_./src/app/app.ts_

```diff
import * as angular from 'angular';
import { routing } from './app.routes'
import {AppComponent} from './app.component';
import { components } from './components'
+ import { AppInsights } from 'applicationinsights-js'

+ /* Call downloadAndSetup to download full ApplicationInsights script from CDN and initialize it with  instrumentation key */
+AppInsights.downloadAndSetup({ 
+    instrumentationKey: "<YOUR INSTRUMENTATION KEY HERE>",
+    // Limit number of Ajax calls logged, to reduce traffic.
+      maxAjaxCallsPerView: 10, // default is 500 
+  });

+ AppInsights.trackPageView();


angular.module('app', [
    'ui.router',
    components.name
  ])
  .config(routing)
  .component('app', AppComponent)
;
```

- Now let's start our fake server:

```bash
npm run api:fake
```

- And let's start our web application:


```bash
npm start
```

- If we just login and navigate to the results list page we can just wait some minutes and check 
the logs stored in app insights portal.




# 00 No JDK

The official JDK has a significant weight and on the other hand is not prepared to 
be full integrated with an Angular application.

In the open source community we can find an interesting library, but it works with ng-router,
and fails with ui-router, in this sample we will just copy the content from the module and
run it from a local project.


## Prerequisites

You will need node (at least v. 8.11.0) installed: https://nodejs.org/en/

## Steps to run it

- We will take as starting point sample _00 Startup_ 

- First you need to install all the depdencies, open your command prompt and execute an _npm install_.

```bash
npm install
```

- Now let's start our fake server:

```bash
npm run api:fake
```

- Let's copy the content of this src folder (but typings) into a subfolder called 
_./src/appinsights_, since this code is old we will need to add the corresponding imports
and exports.

- Now it's time to import it in our application.

./src/app/app.ts

```diff
import * as angular from 'angular';
import { routing } from './app.routes'
import {AppComponent} from './app.component';
import { components } from './components'
+ import {angularAppInsights} from '../appinsights/angularModule';

angular.module('app', [
    'ui.router',
    angularAppInsights.name,
    components.name
  ])
  .config(routing)
+  .component('app', AppComponent);
;
```

- Let's add the following config 

** Pending **

_./src/app/app.insights.ts_

```
export const insightsConfig = ['applicationInsightsServiceProvider', (applicationInsightsServiceProvider) => {
    var options = { applicationName:'demoStatsApp' };
    applicationInsightsServiceProvider.configure('<PUT YOUR APPLICATION INSIGHTS KEY HERE', options );
}];
```

- And let's config our appInsight provider with our app insight key.

./src/app/app.ts

```diff
import * as angular from 'angular';
import { routing } from './app.routes'
import {AppComponent} from './app.component';
import { components } from './components'
import {angularAppInsights} from '../appinsights/angularModule';
+ import {insightsConfig} from './app.insights';

angular.module('app', [
    'ui.router',
    angularAppInsights.name,
    components.name
  ])
  .config(routing)
  .component('app', AppComponent)
+  .config(insightsConfig)  
;
```





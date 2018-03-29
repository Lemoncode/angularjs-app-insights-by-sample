# 00 Managing Exceptions

In this project we are going to keep track of the user navigation.


## Prerequisites

You will need node (at least v. 8.11.0) installed: https://nodejs.org/en/

## Steps

- Let's start from our previous sample _01 basic configuratin_ let's copy the content from that folder.

- First you need to install all the dependencies, open your command prompt and execute an _npm install_.

```bash
npm install
```

- Now let's start our fake server (good idea to let it working in background):

```bash
npm run api:fake
```
- Now we are going to create a new function under the appinsights module:

_./src/appinsights/uirouter.config.ts_

```typescript
import { AppInsights } from 'applicationinsights-js'

stateChange.$inject = ['$rootScope', '$transitions'];

export function stateChange(
  $rootScope: angular.IRootScopeService,
  $transitions : any
) {
  'use strict';

  $transitions.onSuccess({ }, function(trans) {
    AppInsights.trackPageView(trans.router.stateService.current.url)    
  });

/*
// Legacy UI Router versions
  $rootScope.$on('$stateChangeStart',
    (event: any, toState: any, toParams: any) => {  
      AppInsights.trackPageView(toState.name)

    }
  );  
*/
};
```

- Next step is to run this function that we have previously created on module startup.

_./src/appinsights/index.ts_


```diff
import * as angular from 'angular';
import {ExceptionConfig} from './exception.config';
+ import {stateChange} from './uirouter.config'

export const appinsightsmod = angular.module('appinsightsmod', [])
    .config(ExceptionConfig)
+   .run(stateChange)
;
```


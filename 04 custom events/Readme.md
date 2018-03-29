# 04 Custom eventos

In this project we are going to add plumbing to store custom events.


## Prerequisites

You will need node (at least v. 8.11.0) installed: https://nodejs.org/en/

## Steps

- Let's start from our previous sample _03 navigation_ let's copy the content from that folder.

- First you need to install all the dependencies, open your command prompt and execute an _npm install_.

```bash
npm install
```

- Now let's start our fake server (good idea to let it working in background):

```bash
npm run api:fake
```
- Now we are going to create a new service to wrap appinsight trackevent:

_./src/appinsights/trackevent.factory.ts_

```typescript
import { AppInsights } from 'applicationinsights-js'

export class TrackEventService {


  constructor() {      
  }

  public trackEvent(name : string, properties?, measurements?) {
    AppInsights.trackEvent(name, properties, measurements);
  }
}
```

- Next step let's register this service.

_./src/appinsights/index.ts_


```diff
import * as angular from 'angular';
import {ExceptionConfig} from './exception.config';
import {stateChange} from './uirouter.config';
+ import {TrackEventService} from './trackevent.factory'

export const appinsightsmod = angular.module('appinsightsmod', [])
    .config(ExceptionConfig)
+    .service('TrackEventService', TrackEventService)
    .run(stateChange)
;
```

- Now let's use this service when the user just clicks on the login button.

_./src/app/components/login/login.page.controller.ts_

```diff
import { LoginService } from '../../api/login'
import { IToastrService } from 'angular-toastr'
import { StateService } from '@uirouter/angularjs'
+ import { TrackEventService } from '../../../appinsights/trackevent.factory'

export class LoginPageController {
  loginService: LoginService = null;
  toastr: IToastrService;
  $state: StateService;
+  trackEventService : TrackEventService = null;


- constructor(LoginService: LoginService, toastr: IToastrService, $state: StateService) {
+  constructor(LoginService: LoginService, toastr: IToastrService, $state: StateService, TrackEventService : TrackEventService) {

  constructor(LoginService: LoginService, toastr: IToastrService, $state: StateService, TrackEventService : TrackEventService) {
    "ngInject";

    this.loginService = LoginService;
    this.toastr = toastr;
    this.$state = $state;
+    this.trackEventService = TrackEventService;
  }


// ...

- LoginPageController.$inject = ['LoginService', 'toastr', '$state'];
+ LoginPageController.$inject = ['LoginService', 'toastr', '$state', 'TrackEventService'];
```

```diff
  doLogin(login: string, password: string) {
+   this.trackEventService.trackEvent("user clicked on login");    
    this.loginService.validateLogin(login, password).then(
      (succeeded) => {
        if (succeeded) {
          console.log('login succeeded');
          this.$state.go('clients');
        } else {
          this.toastr.error('Incorrect login or password, please try again')
        }
      }
    );
  }
```

- Now we are ready to test our event.

```bash
npm start
```


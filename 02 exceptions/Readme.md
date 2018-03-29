# 00 Managing Exceptions

In this project we are going to create a common module that will hold all the common hooks
to communicate with appinsight.

We will start by implement an excepction interceptor.

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

- Let's create a new folder under _./src_ that will call _appinsights_, under this file
we will create an index.ts file called _index.ts_ and create the following content.

_./src/appinsights/index.ts_

```typescript
import * as angular from 'angular';

export const appinsightsmod = angular.module('appinsightsmod', []);
```

> By working in this way, with a litte bit of extra effort we could encapsulate this a 
reusable library.

- Let's register this module in our main application:

_./src/app/app.ts_

```diff
import { AppInsights } from 'applicationinsights-js'
+ import { appinsightsmod } from '../appinsights';

 /* Call downloadAndSetup to download full ApplicationInsights script from CDN and initialize it with  instrumentation key */
AppInsights.downloadAndSetup({ 
    instrumentationKey: "<YOUR INSTRUMENTATION KEY HERE>",
    // Limit number of Ajax calls logged, to reduce traffic.
      maxAjaxCallsPerView: 10, // default is 500 
  });

AppInsights.trackPageView();


angular.module('app', [
    'ui.router',
    components.name,
+    appinsightsmod.name
  ])
  .config(routing)
  .component('app', AppComponent)
;
```

- Time to do a quick check, to ensure we haven't broken anything. Let's start our web application:


```bash
npm start
```

- Now let's add our plumbing to intercept not controlled exceptions and send them to app insights.

_./appinsights/exception.config.ts_

```typescript
import { AppInsights } from 'applicationinsights-js'

ExceptionConfig.$inject = ['$provide'];

export function ExceptionConfig($provide: any) {
  'use strict';
  $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

extendExceptionHandler.$inject = ['$delegate'];

function extendExceptionHandler($delegate: any) {
  'use strict';
  return (exception: any, cause: any) => {
    $delegate(exception, cause);
    AppInsights.trackException(exception, null, null, null, AI.SeverityLevel.Error);
  };
}
```

- Let's register the exception.

_./appinsights/index.ts_

```diff
import * as angular from 'angular';
+ import {ExceptionConfig} from './exception.config'

- export const appinsightsmod = angular.module('appinsightsmod', []);
+ export const appinsightsmod = angular.module('appinsightsmod', [])
+  .config(ExceptionConfig)
```

- Let's add a button to our login button that will generate an uncontrolled exception.

_./src/app/components/login/login.component.ts_

```diff
export const LoginComponent = {
  template: require('./login.html') as string,
  bindings: {
    onDoLogin: '&',
+   onGenerateException: '&'
  },
```

_./src/app/components/login/login.html_

```diff
  </div>
  
  <button type="submit" class="btn btn-sm btn-default" ng-disabled="loginForm.$pristine || loginForm.$invalid" ng-click="vm.onDoLogin({user:vm.user, pass: vm.password})">Sign in</button>
+ <button class="btn btn-sm btn-default" ng-click="vm.onGenerateException()">Generate uncontrolled exception</button>
</form>
```

_./src/app/components/login.page.controller.ts_

```diff
export class LoginPageController {
  loginService: LoginService = null;
  toastr : IToastrService;
  $state: StateService;

  constructor(LoginService: LoginService, toastr : IToastrService, $state: StateService) {
    "ngInject";

    this.loginService = LoginService;
    this.toastr = toastr;
    this.$state = $state;
  }

+  doUncontrolledException() {
+    throw "my exception";    
+  }

  doLogin(login: string, password: string) {
```

_./src/app/components/login.page.ts_

```diff
import { LoginPageController as controller } from './login.page.controller'

export const LoginPage = {
-  template: '<login on-do-login="vm.doLogin(user, pass)"/>',
+  template: '<login on-do-login="vm.doLogin(user, pass)" on-generate-exception="vm.doUncontrolledException()"/>',
  controller,
  controllerAs: 'vm'
};
```

- If we click on the _generate exception button_ we can see how this exception is recorded
in app insights.




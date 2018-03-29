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

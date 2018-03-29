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
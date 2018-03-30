import * as angular from 'angular';
import { routing } from './app.routes'
import {AppComponent} from './app.component';
import { components } from './components'
import {angularAppInsights} from '../appinsights/angularModule';
import {insightsConfig} from './app.insights';

angular.module('app', [
    'ui.router',
    angularAppInsights.name,
    components.name
  ])
  .config(routing)
  .component('app', AppComponent)
  .config(insightsConfig)  
;

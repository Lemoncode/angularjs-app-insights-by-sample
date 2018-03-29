import * as angular from 'angular';
import {ExceptionConfig} from './exception.config';
import {stateChange} from './uirouter.config'
import {TrackEventService} from './trackevent.factory'

export const appinsightsmod = angular.module('appinsightsmod', [])
    .config(ExceptionConfig)
    .service('TrackEventService', TrackEventService)
    .run(stateChange)
;

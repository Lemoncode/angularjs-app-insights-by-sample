import * as angular from 'angular';
import {ExceptionConfig} from './exception.config';
import {stateChange} from './uirouter.config'

export const appinsightsmod = angular.module('appinsightsmod', [])
    .config(ExceptionConfig)
    .run(stateChange)
;

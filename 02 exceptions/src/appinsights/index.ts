import * as angular from 'angular';
import {ExceptionConfig} from './exception.config';

export const appinsightsmod = angular.module('appinsightsmod', [])
    .config(ExceptionConfig)
;

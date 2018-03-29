import { LoginService } from '../../api/login'
import { IToastrService } from 'angular-toastr'
import { StateService } from '@uirouter/angularjs'
import { TrackEventService } from '../../../appinsights/trackevent.factory'

export class LoginPageController {
  loginService: LoginService = null;
  toastr: IToastrService;
  $state: StateService;
  trackEventService : TrackEventService = null;

  constructor(LoginService: LoginService, toastr: IToastrService, $state: StateService, TrackEventService : TrackEventService) {
    "ngInject";

    this.loginService = LoginService;
    this.toastr = toastr;
    this.$state = $state;
    this.trackEventService = TrackEventService;
  }

  doUncontrolledException() {
    throw "my exception";    
  }

  doLogin(login: string, password: string) {
    this.loginService.validateLogin(login, password).then(
      (succeeded) => {
        this.trackEventService.trackEvent("user clicked on login");
        if (succeeded) {
          console.log('login succeeded');
          this.$state.go('clients');
        } else {
          this.toastr.error('Incorrect login or password, please try again')
        }
      }
    );
  }
}

LoginPageController.$inject = ['LoginService', 'toastr', '$state', 'TrackEventService'];



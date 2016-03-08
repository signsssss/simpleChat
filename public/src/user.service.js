System.register(['./mock-users', 'angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var mock_users_1, core_1, http_1, Observable_1;
    var UserService;
    return {
        setters:[
            function (mock_users_1_1) {
                mock_users_1 = mock_users_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.http = http;
                }
                UserService.prototype.getUsers = function () {
                    return Promise.resolve(mock_users_1.USERS);
                };
                UserService.prototype.getUsersSlowly = function () {
                    return new Promise(function (resolve) {
                        return setTimeout(function () { return resolve(mock_users_1.USERS); }, 2000);
                    });
                };
                UserService.prototype.getUser = function (userId) {
                    var body = JSON.stringify({ userId: userId });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('rooms')
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.login = function (userId, userPw) {
                    var body = JSON.stringify({ userId: userId, userPw: userPw });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post('login', body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.handleError = function (error) {
                    console.log(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map